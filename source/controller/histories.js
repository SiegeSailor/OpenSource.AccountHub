const { pool, History } = require("../model");
const { constant } = require("../configuration");

module.exports = async function (request, response) {
  const { email } = request.context;

  const { limit, page } = request.query;
  if (!Number(limit) || !Number(page))
    return response
      .status(400)
      .send('Must query with valid "limit" and "page".');

  let connection = null;
  try {
    connection = await pool.getConnection();
    const histories = await History.findByEmail(
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
