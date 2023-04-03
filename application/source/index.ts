/// <reference path="./schema.d.ts"/>

import settings from "settings";
import main from "main";

main.listen(settings.environment.PORT, function () {
  console.log(`Listening at ${settings.environment.PORT}.`);
});
