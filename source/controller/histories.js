const { History } = require("../model");
const { constant } = require("../configuration");
const { connect } = require("../utility");

module.exports = async function (request, response) {
  const { email } = request.context;

  await connect(
    response,
    async function (connection) {
      const { limit, page } = request.query;
      if (!Number(limit) || !Number(page))
        return response
          .status(400)
          .send('Must query with valid "limit" and "page".');

      const data = await History.findByEmail(
        connection,
        request.params.email,
        limit,
        page
      );
      await History.create(
        connection,
        constant.MAP_CATEGORY.HISTORY,
        `Viewed histories for ${request.params.email}.`,
        email
      );
      return { data };
    },
    `Failed to view histories for ${request.params.email}`
  );
};
