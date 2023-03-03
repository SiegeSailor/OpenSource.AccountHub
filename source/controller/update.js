const { pool, Account, History } = require("../model");
const { constant } = require("../configuration");
const { permit } = require("../middleware");

module.exports = async function (request, response) {
  const { email, nobility } = request.context;
  if (request.params.email !== email && nobility <= constant.SET_NOBILITY.NAIVE)
    return response
      .status(403)
      .send("Your nobility is too low for this operation.");

  /** So far only allow username and passcode to be modified by users. */
  const keys = Object.keys(request.body);
  for (const key of keys) {
    switch (key) {
      case "username":
      case "passcode":
      case "nobility":
        if (request.params.email === email)
          return response
            .status(403)
            .send(`${key} can't be changed by the owner self.`);
        if (!request.body[key])
          return response.status(400).send(`${key} can't be empty.`);
        break;
      default:
        return response
          .status(400)
          .send("One or all of the keys is not modifiable.");
    }
  }

  let connection = null;
  try {
    connection = await pool.getConnection();
    await Account.update(
      connection,
      permit.hash,
      request.body,
      request.params.email
    );
    await History.create(
      connection,
      constant.MAP_CATEGORY.ACCOUNT,
      `Updated profile with ${keys} for ${request.params.email}.`,
      email
    );
    response
      .status(200)
      .send(
        `Successfully updated profile with ${keys} for ${request.params.email}.`
      );
  } catch (error) {
    if (connection) await connection.rollback();
    response
      .status(500)
      .send(
        `Failed to update profile with ${keys} for ${email}.\n${error.message}`
      );
    throw error;
  } finally {
    if (connection) connection.release();
  }
};
