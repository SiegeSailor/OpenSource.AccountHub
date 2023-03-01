const Account = require("../model/account");
const History = require("../model/history");
const pool = require("../model/database");

module.exports = async function (request, response) {
  const { email, nobility } = request.context;
  if (request.params.email !== email && nobility <= 1) {
    response.status(403).send("Your nobility is too low for this operation.");
    return;
  }

  let connection = null;
  try {
    connection = await pool.getConnection();
    const accounts = await Account.findByEmail(connection, email);
    await History.create(
      connection,
      constant.MAP_CATEGORY.ACCOUNT,
      `View profile for ${request.params.email}`,
      email
    );
    response.status(200).send({ data: accounts });
  } catch (error) {
    if (connection) await connection.rollback();
    response
      .status(500)
      .send(`Failed to query with email ${email}.\n${error.message}`);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
