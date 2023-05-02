import fetches from "fetches";
import main from "main";
import utilities from "utilities";

export default async function () {
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

  const response = await fetches.register(username, password);
  const message = await utilities.format.message(response);
  console.log(message);

  return { response, username, password };
}
