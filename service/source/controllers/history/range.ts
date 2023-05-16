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
  const { limit, page, start, end } = request.query;

  let connection: PoolConnection | null = null;
  try {
    if (!request.session) throw new ReferenceError();

    connection = await databases.pool.getConnection();

    const range = await models.History.findByEmailRange(
      connection,
      email,
      Number(limit),
      Number(page),
      Number(start),
      Number(end)
    );

    await models.History.insert(
      connection,
      utilities.format.resource(request),
      null,
      request.session.email
    );

    return response.status(200).send(
      utilities.format.response("Successfully fetched the history.", {
        range: range.map((history) => {
          return history.response;
        }),
      })
    );
  } catch (error) {
    next(error);
    return response;
  } finally {
    if (connection) connection.release();
  }
}
