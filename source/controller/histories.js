const { pool, History } = require("../model");
const { constant } = require("../configuration");

module.exports = async function (request, response) {
  const { email } = request.context;

  const { limit, page } = request.query;
  if (!limit || !page)
    return response.status(400).send('Must query with "limit" and "page".');

  let connection = null;
  try {
    connection = await pool.getConnection();
    const histories = await History.findByEmail(
      connection,
      request.params.email,
      limit,
      (page - 1) * limit
    );
    await History.create(
      connection,
      constant.MAP_CATEGORY.ACCOUNT,
      `Viewed histories for ${request.params.email}.`,
      email
    );
    response.status(200).send({ data: histories });
  } catch (error) {
    if (connection) await connection.rollback();
    response
      .status(500)
      .send(
        `Failed to view histories for ${request.params.email}.\n${error.message}`
      );
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
