import express from "express";

import controllers from "controllers";
import middleware from "middleware";

const router = express.Router();

router
  .route("/range/:email")
  .get(middleware.session.authenticate, controllers.history.range);

export default router;
