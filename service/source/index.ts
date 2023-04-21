import settings from "settings";
import utilities from "utilities";
import main from "main";

main.listen(settings.environment.SERVICE_PORT, function () {
  console.log(
    `${utilities.format.time()} Listening at ${
      settings.environment.SERVICE_PORT
    }.`
  );
});
