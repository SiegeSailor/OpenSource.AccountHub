import express from "express";
import type { Request, Response, NextFunction } from "express";
import session from "express-session";

import utilities from "utilities";
import routes from "routes";
import settings from "settings";

const main = express();

main.use(express.json());
main.use(express.urlencoded({ extended: true }));
main.use(
  session({
    secret: settings.environment.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: settings.environment.HTTPS,
      maxAge: settings.constants.Milliseconds.DAY,
    },
  })
);

main.use("/", routes);
main.use(function (request: Request, response: Response) {
  response
    .status(404)
    .send(
      utilities.format.response(`${encodeURI(request.url)} is not available.`)
    );
});
main.use(function (
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
});

export default main;
