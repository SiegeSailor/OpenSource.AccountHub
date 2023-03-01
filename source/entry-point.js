const express = require("express");

const { setting } = require("./configuration");

const application = express();

application.use(express.json());
application.use(express.urlencoded({ extended: true }));

application.use("/", require("./route/index"));
application.use(function (request, response) {
  response.status(404).send(`Route "${encodeURI(request.url)}" doesn't exist.`);
});

application.listen(setting.PORT, function () {
  console.log(
    `
${setting.NAME} is on http://localhost:${setting.PORT}. The followings are valid endpoints:

┏ ------------------------------------------------------------------------------------------------------------------------------------------ ┓
| Method | Endpoint                     | Description                                                    | Protection                        |
| ------ | ---------------------------- | -------------------------------------------------------------- | --------------------------------- |
| GET    | /                            | Health check.                                                  |                                   |
| GET    | /account?limit=&page=        | List all accounts with pagination and insensitive information. |                                   |
| POST   | /account/register            | Create an account.                                             |                                   |
| POST   | /account/login               | Obtain a token with username and passcode.                     |                                   |
| POST   | /account/cancel              | Cancel an account. This is irreversible.                       | Token. Only the owner.            |
| GET    | /account/profile/:email      | Obtain the account information for the desired email.          | Token. Nobility > 1 or ownership. |
| PATCH  | /account/profile/:email      | Update the account information for the desired email.          | Token. Nobility > 1 or ownership. |
| POST   | /account/freeze/:email       | Freeze an account.                                             | Token. Nobility > 1 or ownership. |
| POST   | /account/defrost/:email      | Defrost an account.                                            | Token. Nobility > 1.              |
| GET    | /history/:email?limit=&page= | List all history for the desired email with pagination.        | Token.                            |
┗ ------------------------------------------------------------------------------------------------------------------------------------------ ┛
    `
  );
});
