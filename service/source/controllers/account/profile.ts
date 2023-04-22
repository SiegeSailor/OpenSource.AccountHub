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
  let connection: PoolConnection | null = null;
  try {
    if (!request.session) throw new Error();

    connection = await databases.pool.getConnection();

    const accounts = await models.Account.findByEmail(
        connection,
        request.session.email
      ),
      account = accounts[0];

    await models.History.insert(
      connection,
      settings.constants.ECategory.ACCOUNT,
      "Viewed the profile.",
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
