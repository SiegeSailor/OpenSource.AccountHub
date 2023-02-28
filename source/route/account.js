const express = require("express");

const authentication = require("../middleware/authentication");

const router = express.Router();

router.route("/register").post(async function (request, response) {});

router.route("/login").post(function (request, response) {});

module.exports = router;
