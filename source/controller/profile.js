const Account = require("../model/account");
const pool = require("../model/database");

module.exports = async function (request, response) {
  const { email, state } = request.context;
  if (request.params.email !== email && state <= 1) {
    response.status(403).send("Your state is too low for this operation.");
    return;
  }

  let connection = null;
  try {
    connection = await pool.getConnection();
    const accounts = await Account.findByEmail(connection, email);
    response.status(200).send({ data: accounts });
  } catch (error) {
    response
      .status(500)
      .send(`Failed to query with email ${email}.\n${error.message}`);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
