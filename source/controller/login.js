const jwt = require("jsonwebtoken");

const { pool, Account, History } = require("../model");
const { setting, constant } = require("../configuration");
const { permit } = require("../middleware");

module.exports = async function (request, response) {
  const { username, passcode } = request.body;
  if (!username || !passcode)
    return response.status(401).send("Must fill all necessary fields.");

  let connection = null;
  try {
    connection = await pool.getConnection();
    const account = await Account.findByUsername(connection, username)[0];

    if (!account)
      return response.status(404).send("No account found with such username.");
    if (account.passcode !== permit.hash(passcode, account.salt))
      return response.status(401).send("Incorrect passcode.");

    switch (account.state) {
      case constant.MAP_STATE.FROZEN:
        return response.status(403).send("This account has been frozen.");
      case constant.MAP_STATE.CANCELED:
        return response.status(403).send("This account has been canceled.");
      default:
        break;
    }

    await History.create(
      connection,
      constant.MAP_CATEGORY.ACCOUNT,
      "Logged in.",
      account.email
    );

    response.status(200).send({
      token: jwt.sign(
        {
          email: account.email,
          username: account.username,
          passcode: account.passcode,
          nobility: account.nobility,
          state: account.state,
          createdAt: account.createdAt,
          updatedAt: account.updatedAt,
        },
        setting.JWT_SECRET_KEY,
        { expiresIn: "1D" }
      ),
    });
  } catch (error) {
    if (connection) await connection.rollback();
    response.status(500).send(`Failed to login.\n${error.message}`);
  } finally {
    if (connection) connection.release();
  }
};
