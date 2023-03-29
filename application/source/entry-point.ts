import express from "express";

import utilities from "utilities";
import routes from "routes";
import setting from "setting";

const application = express();

application.use(express.json());
application.use(express.urlencoded({ extended: true }));

application.use("/", routes);
application.use(function (request, response) {
  response
    .status(404)
    .send(
      utilities.format.response(`${encodeURI(request.url)} is not available.`)
    );
});

application.listen(setting.PORT, function () {});
