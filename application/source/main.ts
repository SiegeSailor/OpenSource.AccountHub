import express from "express";
import cors from "cors";

import routes from "routes";
import middleware from "middleware";

const main = express();

main.disable("x-powered-by");

main.use(
  express.json(),
  express.urlencoded({ extended: true }),
  cors({ origin: "*", credentials: true }),
  middleware.handler.log
);

main.use("/", routes);
main.use(middleware.handler.fallback);
main.use(middleware.handler.error);

export default main;
