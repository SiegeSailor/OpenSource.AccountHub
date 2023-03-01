const express = require("express");

const { permit } = require("../middleware");
const { register, login, profile, update } = require("../controller");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router
  .route("/profile/:email")
  .get(permit.authenticate, profile)
  .patch(permit.authenticate, update);

module.exports = router;
