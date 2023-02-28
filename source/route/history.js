const express = require("express");

const authentication = require("../middleware/authentication");

const router = express.Router();

router.route("/:identity").get(function (request, response) {});

module.exports = router;
