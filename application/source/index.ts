/// <reference path="./schema.d.ts"/>

import settings from "settings";
import main from "main";

main.listen(settings.environment.APPLICATION_PORT, function () {
  console.log(`Listening at ${settings.environment.APPLICATION_PORT}.`);
});
