import type { Request, Response, NextFunction } from "express";
import settings from "settings/index";

import utilities from "utilities";

function log(request: Request, _: Response, next: NextFunction) {
  console.log(
    `${utilities.format.time()} Received a request from ${
      request.ip
    } to ${encodeURI(request.url)}.`
  );
  next();
}

function fallback(request: Request, response: Response) {
  return response
    .status(404)
    .send(
      utilities.format.response(
        `${request.method} ${encodeURI(request.url)} is not available.`
      )
    );
}

function error(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction
) {
  console.error(`From ${request.url}`);
  console.error(error);

  if (error.code) {
    switch (error.code) {
      case settings.constants.EDatabaseCode.DUP_ENTRY:
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
