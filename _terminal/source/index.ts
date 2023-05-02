import setCookieParser from "set-cookie-parser";

import models from "models";
import main from "main";
import settings from "settings";
import commands from "commands";

const profile = new models.Profile();

async function register() {
  const { response, username, password } = await commands.register();
  if (!response.ok) return;
  const { isProceed } = await main.prompt([
    {
      type: "confirm",
      name: "isProceed",
      message: `Do you want to proceed to ${settings.constants.Choice.ACCESS}?`,
    },
  ]);
  if (isProceed) await access(username, password);
}

async function access(_username?: string, _passcode?: string) {
  const { response, username } = await commands.access(_username, _passcode);
  if (!response.ok) return;
  profile.username = username;
  const cookie = setCookieParser(response.headers.get("set-cookie") || "").find(
    function (predicate) {
      return predicate.name === settings.constants.Session.NAME;
    }
  );
  profile.session = cookie ? cookie.value : "_";
}

async function leave() {
  const { response } = await commands.leave(
    `${settings.constants.Session.NAME}=${profile.session};`
  );
  if (!response.ok) return;
  profile.reset();
}

async function initialize(message = "What do you want to do?") {
  try {
    console.log(
      `\tWelcome, ${
        profile.seeSession()
          ? `${profile.username}.\n\tSession ID: ${profile.session}`
          : "Guest."
      }`
    );
    const choices = profile.seeSession()
      ? [{ name: settings.constants.Choice.LEAVE }]
      : [
          { name: settings.constants.Choice.REGISTER },
          { name: settings.constants.Choice.ACCESS },
        ];
    const { _: purpose } = await main.prompt([
      {
        type: "list",
        name: "_",
        message,
        choices: [...choices, { name: settings.constants.Choice.EXIT }],
      },
    ]);

    switch (purpose) {
      case settings.constants.Choice.REGISTER:
        await register();
        await initialize();
        break;
      case settings.constants.Choice.ACCESS:
        await access();
        await initialize();
        break;
      case settings.constants.Choice.LEAVE:
        await leave();
        await initialize();
        break;
      case settings.constants.Choice.EXIT:
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
