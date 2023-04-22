import type { Request, Response, NextFunction } from "express";
import type { PoolConnection } from "mysql2/promise";
import JWT from "jsonwebtoken";

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
    if (!request.session || !request.payload || !request.payload.exp)
      throw new Error();

    connection = await databases.pool.getConnection();

    const token = JWT.sign(
      {
        ...request.payload,
        exp: request.payload.exp + settings.constants.EToken.EXPIRY_SECONDS,
      },
      settings.environment.SECRET
    );

    await models.History.insert(
      connection,
      settings.constants.ECategory.ACCOUNT,
      "Revived the token.",
      request.session.email
    );

    return response.status(200).send(
      utilities.format.response("Successfully revived the token.", {
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
