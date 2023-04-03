const { Account, History } = require("../model");
const { constant } = require("../configuration");
const { permit } = require("../middleware");
const { connect } = require("../utility");

module.exports = async function (request, response) {
  const { email, nobility } = request.context;

  await connect(
    response,
    async function (connection) {
      if (nobility <= constant.SET_NOBILITY.NAIVE)
        return {
          _status: 403,
          message: "Your nobility is too low for this operation.",
        };

      await Account.update(
        connection,
        permit.hash,
        { state: constant.MAP_STATE.NORMAL },
        request.params.email
      );
      await History.create(
        connection,
        constant.MAP_CATEGORY.ACCOUNT,
        `Defrosted ${request.params.email}.`,
        email
      );
      return { message: `Successfully defrosted ${request.params.email}.` };
    },
    `Failed to defrost ${email}.`
  );
};
