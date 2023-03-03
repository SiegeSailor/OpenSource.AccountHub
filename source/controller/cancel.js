const { Account, History } = require("../model");
const { constant } = require("../configuration");
const { permit } = require("../middleware");
const { connect } = require("../utility");

module.exports = async function (request, response) {
  const { email } = request.context;

  await connect(
    response,
    async function (connection) {
      await Account.update(
        connection,
        permit.hash,
        { state: constant.MAP_STATE.CANCELED },
        email
      );
      await History.create(
        connection,
        constant.MAP_CATEGORY.ACCOUNT,
        "Canceled the account.",
        email
      );
      return { message: "Successfully canceled the account." };
    },
    "Failed to cancel the account."
  );
};
