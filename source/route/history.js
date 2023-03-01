const express = require("express");

const { permit } = require("../middleware");

const router = express.Router();

router.route("/:identity").get(function (request, response) {});

module.exports = router;
