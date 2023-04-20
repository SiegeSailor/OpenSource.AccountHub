import type { Request, Response, NextFunction } from "express";
import type { PoolConnection } from "mysql2/promise";

import utilities from "utilities";
import models from "models";
import settings from "settings";
import middleware from "middleware";

export default async function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { username, passcode } = request.body;

  if (!username || !passcode)
    return response
      .status(400)
      .send(utilities.format.response("Required fields are not filled."));

  let connection: PoolConnection | null = null;
  try {
    const MAX_FAILED_ATTEMPT = 3;
    const LOCKOUT_TIME = settings.constants.Milliseconds.MINUTE * 5;

    const keyAttempt = `${settings.constants.Prefix.ATTEMPT}${username}`;
    const attempt = await middleware.session.client.get(keyAttempt);
    if (attempt) {
      const { count, timestampLast } = JSON.parse(attempt);
      if (count >= MAX_FAILED_ATTEMPT) {
        const milliseconds = Date.now() - timestampLast;

        if (milliseconds < LOCKOUT_TIME) {
          return response
            .status(429)
            .send(
              utilities.format.response(
                `Failed attempts more than ${MAX_FAILED_ATTEMPT}. Please wait ${Math.ceil(
                  (LOCKOUT_TIME - milliseconds) / 1000
                )} seconds before trying again.`
              )
            );
        }
      }
    }

    connection = await models.pool.getConnection();
    const accounts = await models.Account.findByUsername(connection, username),
      _account = accounts[0];
    const DUMMY_PASSCODE = "";
    const DUMMY_SALT =
      "4cefc0fc0f928880e5ac01ad42fc69211030e337ee7b8938cad172dce40f84be" +
      "e95c00f85f951d0a1341681b34ed98b8fdf0ca4cdec28971855a6f05c373b368";
    const account = _account || { passcode: DUMMY_PASSCODE, salt: DUMMY_SALT };
    if (
      account.passcode !== utilities.hash.password(passcode, account.salt) ||
      !_account
    ) {
      const attempt = await middleware.session.client.get(keyAttempt);
      let count = 1;
      if (attempt) count = JSON.parse(attempt).count + 1;

      await middleware.session.client.set(
        keyAttempt,
        JSON.stringify({ count, timestampLast: Date.now() })
      );

      return response
        .status(401)
        .send(
          utilities.format.response(`Invalid credential. Attempts ${count}.`)
        );
    }
    await middleware.session.client.del(keyAttempt);

    switch (account.state) {
      case settings.constants.State.FROZEN:
        return response
          .status(403)
          .send(utilities.format.response("This account has been frozen."));
      case settings.constants.State.CANCELED:
        return response
          .status(403)
          .send(utilities.format.response("This account has been canceled."));
      default:
        break;
    }

    await models.History.insert(
      connection,
      settings.constants.Category.ACCOUNT,
      "Accessed the account.",
      username
    );

    request.session.regenerate(function (error) {
      if (error) next(error);
      request.session[settings.constants.Session.USERNAME] = username;
      response
        .status(200)
        .send(utilities.format.response("Successfully accessed an account."));
    });

    return response;
  } catch (error) {
    next(error);
    return response;
  } finally {
    if (connection) connection.release();
  }
}
