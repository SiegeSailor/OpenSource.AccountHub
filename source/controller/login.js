const jwt = require("jsonwebtoken");

const Account = require("../model/account");
const { hash } = require("../middleware/permit");
const setting = require("../configuration/setting");

module.exports = async function (request, response) {
  const { username, password } = request.body;
  if (username === null || password === null) {
    response.status(400).send("Must fill all necessary fields.");
    return;
  }

  let connection = null;
  try {
    connection = await pool.getConnection();
    const accounts = await Account.findByUsername(connection, username);
    if (accounts.length === 0) {
      response.status(404).send("No account with such username.");
      return;
    }

    const account = accounts.find((account) => {
      return account.passcode === hash(password, account.salt);
    });
    if (account === null) {
      response.status(403).send("Incorrect password.");
      return;
    }

    response.status(200).send({
      token: jwt.sign(
        {
          email: account.email,
          username: account.username,
          passcode: account.passcode,
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
