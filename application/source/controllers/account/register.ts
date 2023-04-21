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
  const { username, passcode } = request.body;

  if (!username || !passcode)
    return response
      .status(400)
      .send(utilities.format.response("Required fields are not filled."));

  let connection: PoolConnection | null = null;
  try {
    connection = await databases.pool.getConnection();
    if ((await models.Account.findByUsername(connection, username)).length)
      return response
        .status(409)
        .send(utilities.format.response("Account already exists."));

    await connection.beginTransaction();
    try {
      await models.Account.insert(
        connection,
        utilities.hash.password,
        username,
        passcode
      );
    } catch (_) {
      const error = _ as Error;
      return response
        .status(400)
        .send(utilities.format.response(error.message));
    }
    await models.History.insert(
      connection,
      settings.constants.Category.ACCOUNT,
      "Registered the account.",
      username
    );
    await connection.commit();

    return response
      .status(200)
      .send(utilities.format.response("Successfully registered an account."));
  } catch (error) {
    if (connection) await connection.rollback();
    next(error);
    return response;
  } finally {
    if (connection) connection.release();
  }
}
