import type { Request, Response } from "express";
import type { PoolConnection } from "mysql2/promise";

import utilities from "utilities";
import models from "models";
import settings from "settings";

export default async function (request: Request, response: Response) {
  const { username, passcode } = request.body;

  if (!username || !passcode)
    return response
      .status(400)
      .send(utilities.format.response("Required fields are not filled."));

  let connection: PoolConnection | null = null;
  try {
    connection = await models.pool.getConnection();
    const accounts = await models.Account.findByUsername(connection, username),
      account = accounts[0];
    if (!account)
      return response
        .status(401)
        .send(utilities.format.response("Invalid credential."));
    if (account.passcode !== utilities.hash.password(passcode, account.salt))
      return response
        .status(401)
        .send(utilities.format.response("Invalid credential."));

    switch (account.state) {
      case settings.constants.State.FROZEN:
        return response
          .status(403)
          .send(utilities.format.response("This account has been frozen."));
      case settings.constants.State.CANCELED:
        return response
          .status(403)
          .send(utilities.format.response("This account has been canceled."));
      default:
        break;
    }

    await models.History.insert(
      connection,
      settings.constants.Category.ACCOUNT,
      "Accessed the account.",
      username
    );

    return response
      .status(200)
      .send(utilities.format.response("Successfully accessed an account."));
  } catch (error) {
    return response
      .status(500)
      .send(utilities.format.response("Failed to access."));
  } finally {
    if (connection) connection.release();
  }
}
