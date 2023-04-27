import express from "express";

import controllers from "controllers";
import middleware from "middleware";
import privilege from "routes/account/privilege";

const router = express.Router();

router.use("/privilege", privilege);

router.route("/register").post(controllers.account.register);
router.route("/access").post(controllers.account.access);
router
  .route("/clear")
  .post(middleware.session.authenticate, controllers.account.clear);
router
  .route("/profile/:email")
  .get(middleware.session.authenticate, controllers.account.profile);
router
  .route("/revive")
  .post(middleware.session.authenticate, controllers.account.revive);

export default router;
