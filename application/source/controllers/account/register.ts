import type { Request, Response } from "express";
import type { PoolConnection } from "mysql2/promise";

import utilities from "utilities";
import models from "models";

export default async function (request: Request, response: Response) {
  const { username, passcode } = request.body;

  if (!username || !passcode)
    return response
      .status(400)
      .send(utilities.format.response("Required fields are not filled."));

  let connection: PoolConnection;
  try {
    connection = await models.pool.getConnection();
    if ((await models.Account.findByUsername(connection, username)).length)
      return response
        .status(409)
        .send(utilities.format.response("Account already exists."));

    await connection.beginTransaction();
    await models.Account.insert(
      connection,
      utilities.hash.password,
      username,
      passcode
    );

    return response;
  } catch (error) {
    return response;
  } finally {
  }
}
