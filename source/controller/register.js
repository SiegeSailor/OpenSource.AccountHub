const { pool, Account, History } = require("../model");
const { constant } = require("../configuration");

module.exports = async function (request, response) {
  const { email, username, passcode } = request.body;
  if (!email || !username || !passcode) {
    response.status(400).send("Must fill all necessary fields.");
    return;
  }

  let connection = null;
  try {
    connection = await pool.getConnection();
    const accounts = await Account.findByEmail(connection, email);
    /** MySQL would still check for duplicates. This is for more accurate error messages. */
    if (accounts.length !== 0) {
      response.status(409).send("The email already exists.");
      return;
    }

    await connection.beginTransaction();
    await Account.create(connection, email, username, passcode);
    await History.create(
      connection,
      constant.MAP_CATEGORY.ACCOUNT,
      "Registered an account.",
      email
    );
    await connection.commit();
    response.status(201).send("Successfully created an account.");
  } catch (error) {
    if (connection) await connection.rollback();
    response.status(500).send(`Failed to create an account.\n${error.message}`);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
