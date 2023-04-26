/// <reference path="./package.d.ts"/>
/// <reference path="./session.d.ts"/>
/// <reference path="./schema.d.ts"/>

import settings from "settings";
import utilities from "utilities";
import main from "main";

main.listen(settings.environment.SERVICE_PORT, function () {
  console.log(
    `[INFO] ${utilities.format.time()} Listening at ${
      settings.environment.SERVICE_PORT
    }.`
  );
});
