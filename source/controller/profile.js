const { Account, History } = require("../model");
const { constant } = require("../configuration");
const { connect } = require("../utility");

module.exports = async function (request, response) {
  const { email, nobility } = request.context;

  await connect(
    response,
    async function (connection) {
      if (
        request.params.email !== email &&
        nobility <= constant.SET_NOBILITY.NAIVE
      )
        return response
          .status(403)
          .send("Your nobility is too low for this operation.");

      const accounts = await Account.findByEmail(
        connection,
        request.params.email
      );
      await History.create(
        connection,
        constant.MAP_CATEGORY.ACCOUNT,
        `Viewed profile for ${request.params.email}.`,
        email
      );
      return { data: accounts[0].wild() };
    },
    `Failed to view profile for ${request.params.email}.`
  );
};
