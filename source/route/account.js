const express = require("express");

const { authenticate } = require("../middleware/permit");
const register = require("../controller/register");
const login = require("../controller/login");

const router = express.Router();

router.route("/register").post(register);

router.route("/login").post(login);

module.exports = router;
