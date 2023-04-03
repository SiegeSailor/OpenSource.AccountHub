import express from "express";

import routes from "routes";
import middleware from "middleware";

const main = express();

main.use(express.json());
main.use(express.urlencoded({ extended: true }));
main.use(middleware.session.session);

main.use("/", routes);
main.use(middleware.handler.fallback);
main.use(middleware.handler.error);

export default main;
