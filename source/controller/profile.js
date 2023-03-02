const { pool, Account, History } = require("../model");
const { constant } = require("../configuration");

module.exports = async function (request, response) {
  const { email, nobility } = request.context;
  if (request.params.email !== email && nobility <= 1)
    return response
      .status(403)
      .send("Your nobility is too low for this operation.");

  let connection = null;
  try {
    connection = await pool.getConnection();
    const accounts = await Account.findByEmail(
      connection,
      request.params.email
    );
    await History.create(
      connection,
      constant.MAP_CATEGORY.ACCOUNT,
      `Viewed profile for ${request.params.email}.`,
      email
    );
    response.status(200).send({ data: accounts[0].wild() });
  } catch (error) {
    if (connection) await connection.rollback();
    response
      .status(500)
      .send(
        `Failed to view profile for ${request.params.email}.\n${error.message}`
      );
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
