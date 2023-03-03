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
        return {
          _status: 403,
          message: "Your nobility is too low for this operation.",
        };

      const accounts = await Account.findByEmail(
        connection,
        request.params.email
      );
      if (accounts.length === 0)
        return {
          _status: 404,
          message: `No account found with ${email}.`,
        };

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
