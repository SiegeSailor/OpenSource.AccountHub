import type { Request, Response, NextFunction } from "express";
import type { PoolConnection } from "mysql2/promise";
import JWT from "jsonwebtoken";

import utilities from "utilities";
import models from "models";
import settings from "settings";
import databases from "databases";

export default async function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { email, passcode } = request.body;

  if (!email || !passcode)
    return response
      .status(400)
      .send(utilities.format.response("Required fields are not filled."));

  let connection: PoolConnection | null = null;
  try {
    const MAX_FAILED_ATTEMPT = 3;
    const TIME_LOCKOUT = settings.constants.EMilliseconds.MINUTE * 5;
    const key = utilities.key.attempt(email);
    const attempt = await databases.store.get(key);
    if (attempt) {
      const { count, timestampLast } = JSON.parse(attempt);
      if (count >= MAX_FAILED_ATTEMPT) {
        const milliseconds = Date.now() - timestampLast;

        if (milliseconds < TIME_LOCKOUT) {
          return response
            .status(429)
            .send(
              utilities.format.response(
                `Failed attempts more than ${MAX_FAILED_ATTEMPT}. Please wait ${Math.ceil(
                  (TIME_LOCKOUT - milliseconds) / 1000
                )} seconds before trying again.`
              )
            );
        }
      }
    }

    connection = await databases.pool.getConnection();
    const _account = await models.Account.findByEmail(connection, email);

    const DUMMY_PASSCODE = "";
    const DUMMY_SALT =
      "4cefc0fc0f928880e5ac01ad42fc69211030e337ee7b8938cad172dce40f84be" +
      "e95c00f85f951d0a1341681b34ed98b8fdf0ca4cdec28971855a6f05c373b368";
    const account = _account || { passcode: DUMMY_PASSCODE, salt: DUMMY_SALT };
    if (
      account.passcode !== utilities.hash.password(passcode, account.salt) ||
      !_account
    ) {
      const attempt = await databases.store.get(key);
      let count = 1;
      if (attempt) count = JSON.parse(attempt).count + 1;

      await databases.store.set(
        key,
        JSON.stringify({ count, timestampLast: Date.now() })
      );

      return response
        .status(401)
        .send(
          utilities.format.response(`Invalid credential. Attempts ${count}.`)
        );
    }
    await databases.store.del(key);

    switch (account.state) {
      case settings.constants.EState.FROZEN:
        return response
          .status(403)
          .send(utilities.format.response("This account has been frozen."));
      case settings.constants.EState.CANCELED:
        return response
          .status(403)
          .send(utilities.format.response("This account has been canceled."));
      default:
        break;
    }

    await databases.store.set(
      utilities.key.session(email),
      JSON.stringify(account.session)
    );

    const token = JWT.sign({ data: { email } }, settings.environment.SECRET, {
      expiresIn: settings.constants.EToken.EXPIRY_SECONDS,
    });

    await models.History.insert(
      connection,
      settings.constants.ECategory.ACCOUNT,
      "Accessed the account.",
      email
    );

    return response.status(200).send(
      utilities.format.response("Successfully accessed an account.", {
        token,
      })
    );
  } catch (error) {
    next(error);
    return response;
  } finally {
    if (connection) connection.release();
  }
}
