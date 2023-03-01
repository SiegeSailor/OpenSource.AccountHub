const Account = require("../model/account");
const History = require("../model/history");

module.exports = async function (email, username, password) {
  let connection = null;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();
    await Account.create(connection, email, username, password);
    await History.create(
      connection,
      constant.MAP_CATEGORY.ACCOUNT,
      "Registered an account.",
      email
    );
    await connection.commit();
  } catch (error) {
    if (connection) await connection.rollback();
    console.error(error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
