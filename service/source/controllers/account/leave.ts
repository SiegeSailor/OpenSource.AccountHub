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
    if (!request.session) throw new Error();
    connection = await databases.pool.getConnection();

    await models.History.insert(
      connection,
      settings.constants.ECategory.ACCOUNT,
      "Leaved from a session.",
      request.session.username
    );
    await databases.store.del(
      `${settings.constants.EStorePrefix.SESSION}${request.identifier}`
    );

    return response
      .status(200)
      .send(utilities.format.response("Successfully leaved from a session."));
  } catch (error) {
    next(error);
    return response;
  } finally {
    if (connection) connection.release();
  }
}
