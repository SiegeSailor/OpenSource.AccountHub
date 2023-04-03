/// <reference path="./schema.d.ts"/>

import settings from "settings";
import main from "main";

main.listen(settings.environment.PORT_APPLICATION, function () {
  console.log(`Listening at ${settings.environment.PORT_APPLICATION}.`);
});
