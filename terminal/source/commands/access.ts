import fetches from "fetches";
import main from "main";

export default async function () {
  const { username, passcode } = await main.prompt([
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
  const responseAccess = await fetches.access(username, passcode);
  responseAccess.headers.forEach((header) => {
    console.log(header);
  });
  const result = await responseAccess.json();
  console.log(result);
}
