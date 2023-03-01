const express = require("express");

const { authenticate } = require("../middleware/permit");
const register = require("../controller/register");

const router = express.Router();

router.route("/register").post(async function (request, response) {
  try {
    const { email, username, password } = request.body;
    await register(email, username, password);
    response.status(201).send("Successfully created an account.");
  } catch (error) {
    response.status(500).send("Failed to create an account.");
  }
});

router.route("/login").post(async function (request, response) {
  try {
    const { email, username, password } = request.body;
    await register(email, username, password);
    response.status(201).send("Successfully created an account.");
  } catch (error) {
    response.status(500).send("Failed to create an account.");
  }
});

module.exports = router;
