import express from "express";

import controllers from "controllers";
import middleware from "middleware";

const router = express.Router();

router
  .route("/grant/:email")
  .post(middleware.session.authenticate, controllers.account.privilege.grant);
router
  .route("/revoke/:email")
  .post(middleware.session.authenticate, controllers.account.privilege.revoke);

export default router;
