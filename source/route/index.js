const express = require("express");

const setting = require("../configuration/setting");

const router = express.Router();

router.use("/account", require("./account"));
router.use("/history", require("./history"));

router.route("/").get(function (_, response) {
  response.status(200).send(`${setting.NAME} is working.`);
});

module.exports = router;
