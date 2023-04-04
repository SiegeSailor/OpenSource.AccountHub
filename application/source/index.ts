/// <reference path="./schema.d.ts"/>

import settings from "settings";
import utilities from "utilities";
import main from "main";

main.listen(settings.environment.APPLICATION_PORT, function () {
  console.log(
    `${utilities.format.time()} Listening at ${
      settings.environment.APPLICATION_PORT
    }.`
  );
});
