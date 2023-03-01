const jwt = require("jsonwebtoken");

const Account = require("../model/account");
const History = require("../model/history");
const pool = require("../model/database");
const { hash } = require("../middleware/permit");
const setting = require("../configuration/setting");
const constant = require("../configuration/constant");

module.exports = async function (request, response) {
  const { username, password } = request.body;
  if (username === null || password === null) {
    response.status(401).send("Must fill all necessary fields.");
    return;
  }

  let connection = null;
  try {
    connection = await pool.getConnection();
    const accounts = await Account.findByUsername(connection, username);
    if (accounts.length === 0) {
      response.status(404).send("No account found with such username.");
      return;
    }

    const account = accounts.find((account) => {
      return account.passcode === hash(password, account.salt);
    });
    if (account === null) {
      response.status(401).send("Incorrect password.");
      return;
    }
    switch (account.state) {
      case constant.MAP_CONDITION.FROZEN:
        response.status(403).send("This account has been frozen.");
        return;
      case constant.MAP_CONDITION.DELETED:
        response.status(403).send("This account has been deleted.");
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
