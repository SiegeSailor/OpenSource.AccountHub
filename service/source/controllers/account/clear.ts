import type { Request, Response, NextFunction } from "express";
import type { PoolConnection } from "mysql2/promise";

import utilities from "utilities";
import models from "models";
import settings from "settings";
import databases from "databases";

export default async function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  let connection: PoolConnection | null = null;
  try {
    if (!request.session) throw new ReferenceError();

    connection = await databases.pool.getConnection();

    await databases.store.del(utilities.key.session(request.session.email));

    await models.History.insert(
      connection,
      settings.constants.EHistoryCategory.ACCOUNT,
      "Cleared existing sessions.",
      request.session.email
    );

    return response
      .status(200)
      .send(
        utilities.format.response("Successfully cleared existing sessions.")
      );
  } catch (error) {
    next(error);
    return response;
  } finally {
    if (connection) connection.release();
  }
}
