import fetches from "fetches";
import main from "main";
import utilities from "utilities";

export default async function (_username?: string, _passcode?: string) {
  const { username, passcode } =
    _username && _passcode
      ? { username: _username, passcode: _passcode }
      : await main.prompt([
          {
            type: "string",
            name: "username",
            message: "Enter username:",
          },
          {
            type: "password",
            name: "passcode",
            message: "Enter password:",
          },
        ]);
  const response = await fetches.access(username, passcode);
  const message = await utilities.format.message(response);
  console.log(message);

  return { response, username };
}
