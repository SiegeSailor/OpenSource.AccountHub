import express from "express";

import utilities from "utilities";

const router = express.Router();

router.route("/").get(function (_, response) {
  response
    .status(200)
    .send(utilities.format.response("The service is working."));
});

export default router;
