const express = require("express");

const { permit } = require("../middleware");
const { histories } = require("../controller");

const router = express.Router();

router.route("/:email").get(permit.authenticate, histories);

module.exports = router;
