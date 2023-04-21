import type { Request, Response, NextFunction } from "express";
import JWT, { JWTPayload } from "jsonwebtoken";

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

  let payload: JWTPayload | null = null;
  try {
    payload = JWT.verify(token, settings.environment.SECRET);
  } catch {
    return response
      .status(401)
      .send(utilities.format.response("Invalid session."));
  }

  const session = await databases.store.get(
    `${settings.constants.Prefix.SESSION}${payload.identifier}`
  );
  if (!session)
    return response
      .status(401)
      .send(utilities.format.response("Session does not exist."));

  request.session = JSON.parse(session);
  request.identifier = payload.identifier;
  next();
  return response;
}

export default {
  authenticate,
};
