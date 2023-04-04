import express from "express";

import routes from "routes";
import middleware from "middleware";

const main = express();

main.disable("x-powered-by");

main.use(
  express.json(),
  express.urlencoded({ extended: true }),
  middleware.handler.log,
  middleware.session.session
);

main.use("/", routes);
main.use(middleware.handler.fallback);
main.use(middleware.handler.error);

export default main;
