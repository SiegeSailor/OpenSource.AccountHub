const { pool, Account, History } = require("../model");
const { constant } = require("../configuration");
const { permit } = require("../middleware");

module.exports = async function (request, response) {
  const { email } = request.context;

  let connection = null;
  try {
    connection = await pool.getConnection();
    await Account.update(
      connection,
      permit.hash,
      { state: constant.MAP_STATE.CANCELED },
      email
    );
    await History.create(
      connection,
      constant.MAP_CATEGORY.ACCOUNT,
      "Canceled the account.",
      email
    );
    response.status(200).send("Successfully canceled the account.");
  } catch (error) {
    if (connection) await connection.rollback();
    response
      .status(500)
      .send(`Failed to cancel the account.\n${error.message}`);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
