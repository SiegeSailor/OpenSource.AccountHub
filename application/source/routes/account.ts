import express from "express";

import controllers from "controllers";

const router = express.Router();

router.route("/register").post(controllers.account.register);
router.route("/access").post(controllers.account.access);

export default router;
