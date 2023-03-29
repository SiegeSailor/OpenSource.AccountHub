import express from "express";

import utilities from "utilities";
import routes from "routes";
import settings from "settings";

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

application.listen(settings.PORT, function () {
  console.log(`Listening at ${settings.PORT}.`);
});
