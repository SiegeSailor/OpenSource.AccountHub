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
  const { privileges } = request.body;

  if (!privileges)
    return response
      .status(400)
      .send(utilities.format.response("Required fields are not filled."));

  let connection: PoolConnection | null = null;
  try {
    if (!request.session) throw new ReferenceError();
    if (email === request.session.email)
      return response
        .status(403)
        .send(
          utilities.format.response(
            "The account owner himself can not modify privileges."
          )
        );

    connection = await databases.pool.getConnection();

    await connection.beginTransaction();

    await models.Account.grant(connection, email, privileges);

    await databases.store.set(
      utilities.key.session(request.session.email),
      JSON.stringify({
        ...request.session,
        privileges: request.session.privileges.concat(privileges),
      }),
      "XX"
    );

    await models.History.insert(
      connection,
      utilities.format.resource(request),
      JSON.stringify(request.body),
      request.session.email
    );
    await connection.commit();

    return response
      .status(200)
      .send(
        utilities.format.response(
          "Successfully granted privileges to the account."
        )
      );
  } catch (error) {
    if (connection) await connection.rollback();
    next(error);
    return response;
  } finally {
    if (connection) connection.release();
  }
}
