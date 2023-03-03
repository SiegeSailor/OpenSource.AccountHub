const { Account, History } = require("../model");
const { constant } = require("../configuration");
const { connect } = require("../utility");

module.exports = async function (request, response) {
  const { email } = request.context;

  const { limit, page } = request.query;
  if (!Number(limit) || !Number(page))
    return response
      .status(400)
      .send('Must query with valid "limit" and "page".');

  await connect(
    response,
    async function (connection) {
      const accounts = await Account.findAll(connection, limit, page);
      await History.create(
        connection,
        constant.MAP_CATEGORY.ACCOUNT,
        "Viewed all profile.",
        email
      );
      return { data: accounts.map((account) => account.wild()) };
    },
    "Failed to view all profile."
  );
};
