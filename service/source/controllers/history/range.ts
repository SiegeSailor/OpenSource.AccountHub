import type { Request, Response, NextFunction } from "express";
import type { PoolConnection } from "mysql2/promise";

import utilities from "utilities";
import models from "models";
import databases from "databases";
import settings from "settings";

export default async function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { email } = request.params;
  const { limit, page, start, end } = request.query;

  let connection: PoolConnection | null = null;
  try {
    if (!request.session) throw new Error();

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
      settings.constants.EHistoryCategory.HISTORY,
      `Viewed the history of ${email}.`,
      request.session.email
    );

    return response.status(200).send(
      utilities.format.response("Successfully fetched the history.", {
        range: range.map((history) => {
          return history.all;
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
