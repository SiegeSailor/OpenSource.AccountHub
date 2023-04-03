import type { Request, Response, NextFunction } from "express";

import utilities from "utilities";
import settings from "settings";

export default async function (
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (request.session[settings.constants.Session.ACCOUNT]) next();
  else response.status(401).send(utilities.format.response("Invalid session."));
}
