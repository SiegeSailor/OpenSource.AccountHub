const { Account, History } = require("../model");
const { constant } = require("../configuration");
const { permit } = require("../middleware");
const { connect } = require("../utility");

module.exports = async function (request, response) {
  const { email, username, passcode } = request.body;
  if (!email || !username || !passcode)
    return response.status(400).send("Must fill all necessary fields.");

  await connect(
    response,
    async function (connection) {
      if ((await Account.findByEmail(connection, email)).length !== 0)
        return response.status(409).send("The email already exists.");
      if ((await Account.findByUsername(connection, username)).length !== 0)
        return response.status(409).send("The username already exists.");

      await connection.beginTransaction();
      await Account.create(connection, permit.hash, email, username, passcode);
      await History.create(
        connection,
        constant.MAP_CATEGORY.ACCOUNT,
        "Registered an account.",
        email
      );
      await connection.commit();
      return { message: "Successfully registered an account." };
    },
    "Failed to create an account."
  );
};
