import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";

import routes from "routes";
import middleware from "middleware";
import settings from "settings";

const main = express();

main.disable("x-powered-by");

const MAX_NUMBER_PER_IP = 50;
main.use(
  rateLimit({
    windowMs: settings.constants.EMilliseconds.MINUTE * 15,
    max: MAX_NUMBER_PER_IP,
    standardHeaders: true,
    legacyHeaders: false,
  }),
  express.json(),
  express.urlencoded({ extended: true }),
  cors({ origin: settings.environment.ORIGIN, credentials: true }),
  middleware.handler.log
);

main.use("/", routes);
main.use(middleware.handler.fallback);
main.use(middleware.handler.error);

export default main;
