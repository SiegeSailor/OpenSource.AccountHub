const { pool, Account, History } = require("../model");
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
    const accounts = await Account.findAll(connection, limit, page);
    await History.create(
      connection,
      constant.MAP_CATEGORY.ACCOUNT,
      "Viewed all profile.",
      email
    );
    response
      .status(200)
      .send({ data: accounts.map((account) => account.wild()) });
  } catch (error) {
    if (connection) await connection.rollback();
    response.status(500).send(`Failed to view all profile.\n${error.message}`);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
