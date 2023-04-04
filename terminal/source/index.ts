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
        console.log("\tThe username can only contain letters and numbers.");
        console.log(
          "\tThe password should contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
        );
        console.log(
          "\tBoth are case insensitive. The minimum length is 8 for username, 16 for password."
        );
        const { username, _passcode } = await main.prompt([
          {
            type: "string",
            name: "username",
          },
          {
            type: "password",
            name: "_passcode",
            message: "password",
          },
        ]);
        console.log("Please enter the password again:");
        const { passcode } = await main.prompt([
          {
            type: "password",
            name: "passcode",
            message: "password",
          },
        ]);
        const result = await calls.register(username, passcode);
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
