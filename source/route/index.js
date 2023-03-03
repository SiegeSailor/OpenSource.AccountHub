const express = require("express");

const { setting } = require("../configuration");
const { format } = require("../utility");

const router = express.Router();

router.use("/account", require("./account"));
router.use("/history", require("./history"));

router.route("/").get(function (_, response) {
  format(response, 200, {
    message: `"${setting.NAME}" is working.`,
  });
});

module.exports = router;
