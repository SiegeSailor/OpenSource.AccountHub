const { Account, History } = require("../model");
const { constant } = require("../configuration");
const { permit } = require("../middleware");
const { connect } = require("../utility");

module.exports = async function (request, response) {
  const { email, username, passcode } = request.body;

  await connect(
    response,
    async function (connection) {
      if (!email || !username || !passcode)
        return {
          _status: 400,
          message: "Must fill all necessary fields.",
        };

      if ((await Account.findByEmail(connection, email)).length !== 0)
        return {
          _status: 409,
          message: "The email already exists.",
        };
      if ((await Account.findByUsername(connection, username)).length !== 0)
        return {
          _status: 409,
          message: "The username already exists.",
        };

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
