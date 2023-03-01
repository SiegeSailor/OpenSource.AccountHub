const { pool, Account, History } = require("../model");
const { constant } = require("../configuration");

module.exports = async function (request, response) {
  const { email, nobility } = request.context;
  if (request.params.email !== email && nobility <= 1) {
    response.status(403).send("Your nobility is too low for this operation.");
    return;
  }

  const keys = Object.keys(request.body);
  for (const key in keys) {
    switch (key) {
      case "username":
        break;
      case "passcode":
        break;
    }
  }

  let connection = null;
  try {
    connection = await pool.getConnection();
    const accounts = await Account.findByEmail(connection, email);
    await accounts[0].update(connection, request.body);
    await History.create(
      connection,
      constant.MAP_CATEGORY.ACCOUNT,
      `Update profile for ${request.params.email}`,
      email
    );
    response.status(200).send(`Update ${request.params.email} successfully.`);
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
