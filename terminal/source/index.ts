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
        const { username } = await main.prompt([
          {
            type: "string",
            name: "username",
            message: "Enter username:",
          },
        ]);

        let password = "";
        while (!password) {
          const { _passcode, passcode } = await main.prompt([
            {
              type: "password",
              name: "_passcode",
              message: "Enter password:",
            },
            {
              type: "password",
              name: "passcode",
              message: "Re-enter password:",
            },
          ]);
          if (_passcode === passcode) password = passcode;
          else console.log("You have to enter the same password twice.");
        }
        const result = await calls.register(username, password);
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
    await initialize();
  } catch (error) {
    console.error(error);
    await initialize("Error occurred. Please try again.");
  }
}

initialize();
