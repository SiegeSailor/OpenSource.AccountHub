const { pool, Account, History } = require("../model");
const { constant } = require("../configuration");
const { permit } = require("../middleware");

module.exports = async function (request, response) {
  const { email, nobility } = request.context;
  if (nobility <= constant.SET_NOBILITY.NAIVE)
    return response
      .status(403)
      .send("Your nobility is too low for this operation.");

  let connection = null;
  try {
    connection = await pool.getConnection();
    await Account.update(
      connection,
      permit.hash,
      { state: constant.MAP_STATE.NORMAL },
      request.params.email
    );
    await History.create(
      connection,
      constant.MAP_CATEGORY.ACCOUNT,
      `Defrosted ${request.params.email}.`,
      email
    );
    response
      .status(200)
      .send(`Successfully defrosted ${request.params.email}.`);
  } catch (error) {
    if (connection) await connection.rollback();
    response.status(500).send(`Failed to defrost ${email}.\n${error.message}`);
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
