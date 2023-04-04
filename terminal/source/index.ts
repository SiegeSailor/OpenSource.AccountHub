import models from "models";
import main from "main";
import settings from "settings";
import commands from "commands";

const profile = new models.Profile();

async function initialize(message = "What do you want to do?") {
  try {
    console.log(
      `\tWelcome, ${profile.seeSession() ? profile.username : "Guest"}.`
    );
    const choices = profile.seeSession()
      ? [{ name: settings.constants.Choice.Leave }]
      : [
          { name: settings.constants.Choice.Register },
          { name: settings.constants.Choice.Access },
        ];
    const { _: purpose } = await main.prompt([
      {
        type: "list",
        name: "_",
        message,
        choices: [...choices, { name: settings.constants.Choice.Exit }],
      },
    ]);

    switch (purpose) {
      case settings.constants.Choice.Register:
        await commands.register(profile);
        break;
      case settings.constants.Choice.Access:
        await commands.access();
        break;
      case settings.constants.Choice.Leave:
        await commands.leave();
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
