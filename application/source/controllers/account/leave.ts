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
      request.session[settings.constants.Session.USERNAME]
    );

    request.session.cookie.maxAge = settings.constants.Milliseconds.NOW;
    request.session.destroy(function (error) {
      if (error) next(error);
      response.clearCookie(settings.constants.Session.NAME);
      response
        .status(200)
        .send(utilities.format.response("Successfully leaved from a session."));
    });

    return response;
  } catch (error) {
    next(error);
    return response;
  } finally {
    if (connection) connection.release();
  }
}
