import type { Request, Response, NextFunction } from "express";
import type { PoolConnection } from "mysql2/promise";

import utilities from "utilities";
import models from "models";
import databases from "databases";
import settings from "settings";

export default async function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { email } = request.params;

  if (!email)
    return response
      .status(400)
      .send(utilities.format.response("Required fields are not filled."));

  let connection: PoolConnection | null = null;
  try {
    if (!request.session) throw new Error();

    connection = await databases.pool.getConnection();

    const account = await models.Account.findByEmail(connection, email);
    if (!account)
      return response
        .status(404)
        .send(utilities.format.response("The account does not exist."));

    await databases.store.set(
      utilities.key.session(request.session.email),
      JSON.stringify(account.session),
      "XX"
    );

    await models.History.insert(
      connection,
      settings.constants.EHistoryCategory.ACCOUNT,
      `Viewed the profile from ${email}.`,
      request.session.email
    );

    return response
      .status(200)
      .send(
        utilities.format.response(
          "Successfully fetched the profile.",
          account.session
        )
      );
  } catch (error) {
    next(error);
    return response;
  } finally {
    if (connection) connection.release();
  }
}
