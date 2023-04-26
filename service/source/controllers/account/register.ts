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
  const { email, passcode } = request.body;

  if (!email || !passcode)
    return response
      .status(400)
      .send(utilities.format.response("Required fields are not filled."));

  let connection: PoolConnection | null = null;
  try {
    connection = await databases.pool.getConnection();

    await connection.beginTransaction();

    await models.Account.insert(
      connection,
      utilities.hash.password,
      email,
      passcode
    );

    await models.History.insert(
      connection,
      settings.constants.EHistoryCategory.ACCOUNT,
      "Registered the account.",
      email
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
