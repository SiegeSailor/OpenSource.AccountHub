import type { Request, Response, NextFunction } from "express";
import type { PoolConnection } from "mysql2/promise";

import utilities from "utilities";
import models from "models";
import databases from "databases";

export default async function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { email } = request.params;

  let connection: PoolConnection | null = null;
  try {
    if (!request.session) throw new ReferenceError();

    connection = await databases.pool.getConnection();

    const account = await models.Account.findByEmail(connection, email);
    if (!account)
      return response
        .status(404)
        .send(utilities.format.response("The account does not exist."));

    await utilities.store.update(
      utilities.key.session(request.session.email),
      JSON.stringify(account.response)
    );

    await models.History.insert(
      connection,
      utilities.format.resource(request),
      null,
      request.session.email
    );

    return response.status(200).send(
      utilities.format.response("Successfully fetched the profile.", {
        profile: account.response,
      })
    );
  } catch (error) {
    next(error);
    return response;
  } finally {
    if (connection) connection.release();
  }
}
