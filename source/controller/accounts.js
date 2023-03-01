const { pool, Account, History } = require("../model");
const { constant } = require("../configuration");

module.exports = async function (request, response) {
  const { email } = request.context;

  let connection = null;
  try {
    connection = await pool.getConnection();
    const accounts = await Account.findAll(connection);
    await History.create(
      connection,
      constant.MAP_CATEGORY.ACCOUNT,
      "Viewed all profile.",
      email
    );
    response.status(200).send({ data: accounts });
  } catch (error) {
    if (connection) await connection.rollback();
    response.status(500).send(`Failed to view all profile.\n${error.message}`);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
