import models from "models";
import calls from "calls";
import main from "main";
import settings from "settings";

const profile = new models.Profile();

async function initialize(message = "What do you want to do?") {
  try {
    const { _: purpose } = await main.prompt([
      {
        type: "list",
        name: "_",
        message,
        choices: [
          { name: settings.constants.Choice.Register },
          { name: settings.constants.Choice.Access },
          { name: settings.constants.Choice.Leave },
          { name: settings.constants.Choice.Exit },
        ],
      },
    ]);

    switch (purpose) {
      case settings.constants.Choice.Register:
        console.log(
          `The username can only contain letters and numbers, and be case insensitive. The password should contain at least 1 upper case letter, 1 lower case letter, 1 number and 1 special character. The minimum length of the password should be 16. `
        );
        const { username, passcode } = await main.prompt([
          {
            type: "string",
            name: "username",
            message: "Enter the username Only letters and numbers:",
          },
          {
            type: "string",
            name: "passcode",
            message:
              "Enter the passcode. Contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character:",
          },
        ]);
        break;
      case settings.constants.Choice.Access:
        break;
      case settings.constants.Choice.Leave:
        break;
      case settings.constants.Choice.Exit:
        console.log("Successfully terminated the program.\n");
        break;
      default:
        throw new Error("Invalid operation.");
    }
  } catch (error) {
    console.error(error);
    await initialize("Error occurred. Please try again.");
  }
}

initialize();
