import express from "express";

import utilities from "utilities";
import account from "routes/account";
import history from "routes/history";

const router = express.Router();

router.use("/account", account);
router.use("/history", history);

router.route("/").get(function (_, response) {
  response
    .status(200)
    .send(utilities.format.response("The service is working."));
});

export default router;
