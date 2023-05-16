import type { Request, Response, NextFunction } from "express";
import JWT, { JwtPayload } from "jsonwebtoken";

import utilities from "utilities";
import settings from "settings";
import databases from "databases";

async function authenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.headers.authorization;
  if (!token)
    return response
      .status(401)
      .send(utilities.format.response("Token is required for this endpoint."));

  let payload: JwtPayload | null = null;
  try {
    payload = JWT.verify(token, settings.environment.SECRET) as JwtPayload;
    if (!payload) throw new ReferenceError();
  } catch (_) {
    const error = _ as Error;
    let message = "Invalid session.";
    switch (error.name) {
      case JWT.JsonWebTokenError.name:
        message = "Invalid token.";
        break;
      case JWT.NotBeforeError.name:
        message = "The token is not available yet.";
        break;
      case JWT.TokenExpiredError.name:
        message = "The token has expired.";
        break;
    }
    return response.status(401).send(utilities.format.response(message));
  }

  const session = await databases.store.get(
    utilities.key.session(payload.data.email)
  );
  if (!session)
    return response
      .status(401)
      .send(utilities.format.response("The session does not exist."));

  request.session = JSON.parse(session);
  request.payload = payload;
  next();
  return response;
}

export default {
  authenticate,
};
