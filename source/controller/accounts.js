const { pool, Account, History } = require("../model");
const { constant } = require("../configuration");

module.exports = async function (request, response) {
  const { email } = request.context;

  const { limit, page } = request.query;
  if (!limit || !page)
    return response.status(400).send('Must query with "limit" and "page".');

  let connection = null;
  try {
    connection = await pool.getConnection();
    const accounts = await Account.findAll(
      connection,
      limit,
      (page - 1) * limit
    );
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
