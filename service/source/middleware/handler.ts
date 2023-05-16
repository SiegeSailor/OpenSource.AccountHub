import type { Request, Response, NextFunction } from "express";

import settings from "settings";
import utilities from "utilities";

function log(request: Request, _: Response, next: NextFunction) {
  console.log(
    `[INFO] ${utilities.format.time()} ${utilities.format.resource(
      request
    )} from ${request.ip}.`
  );
  next();
}

function fallback(request: Request, response: Response) {
  return response
    .status(404)
    .send(
      utilities.format.response(
        `${utilities.format.resource(request)} is not available.`
      )
    );
}

function error(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction
) {
  console.error(
    `[ERROR] ${utilities.format.time()} ${
      error.name
    } from ${utilities.format.resource(request)}`
  );
  console.error(error.stack);

  if (error.name === "TypeError")
    return response
      .status(400)
      .send(
        utilities.format.response(utilities.format.capitalize(error.message))
      );

  if (error.code) {
    console.error(`Error Code: ${error.code}`);
    switch (error.code) {
      case settings.constants.EDatabaseCode.DUPLICATE_ENTRY:
      case settings.constants.EDatabaseCode.DUPLICATE_KEY:
        return response
          .status(409)
          .send(utilities.format.response("Data already exist."));
      default:
        return response
          .status(500)
          .send(utilities.format.response("Errors occur in the database."));
    }
  }

  return response
    .status(500)
    .send(utilities.format.response("Failed to handle the request."));
}

export default { log, fallback, error };
