import type { Request, Response, NextFunction } from "express";
import type { PoolConnection } from "mysql2/promise";

import utilities from "utilities";
import models from "models";
import settings from "settings";

export default async function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  let connection: PoolConnection | null = null;
  try {
    connection = await models.pool.getConnection();

    await models.History.insert(
      connection,
      settings.constants.Category.ACCOUNT,
      "Leaved from a session.",
      request.session[settings.constants.Session.ACCOUNT].username
    );

    request.session[settings.constants.Session.ACCOUNT] = null;
    request.session.save(function (error) {
      if (error) next(error);
      request.session.regenerate(function (error) {
        if (error) next(error);
      });
    });

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
