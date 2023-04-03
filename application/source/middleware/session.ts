import type { Request, Response, NextFunction } from "express";

import utilities from "utilities";

export default async function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (request.session["account"]) next();
  else response.status(401).send(utilities.format.response("Invalid session."));
}
