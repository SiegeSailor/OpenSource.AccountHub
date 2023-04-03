import express from "express";

import controllers from "controllers";
import middleware from "middleware";

const router = express.Router();

router.route("/register").post(controllers.account.register);
router.route("/access").post(controllers.account.access);
router.route("/leave").post(middleware.session, controllers.account.leave);

export default router;
