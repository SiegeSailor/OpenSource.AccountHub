const express = require("express");

const { authenticate } = require("../middleware/permit");

const router = express.Router();

router.route("/:identity").get(function (request, response) {});

module.exports = router;
