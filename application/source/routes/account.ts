import express from "express";

import controllers from "controllers";

const router = express.Router();

router.route("/register").post(controllers.account.register);

export default router;
