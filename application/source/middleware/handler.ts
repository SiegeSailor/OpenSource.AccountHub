import type { Request, Response, NextFunction } from "express";

import utilities from "utilities";

function log(request: Request, _: Response, next: NextFunction) {
  console.log(
    `${utilities.format.time()} Received request from ${
      request.ip
    } to ${encodeURI(request.url)}.`
  );
  next();
}

function fallback(request: Request, response: Response) {
  response
    .status(404)
    .send(
      utilities.format.response(`${encodeURI(request.url)} is not available.`)
    );
}

function error(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction
) {
  response.status(500).send(
    utilities.format.response("Failed to handle the request.", {
      requestURL: request.url,
      errorStack: error.stack,
    })
  );
}

export default { log, fallback, error };
