const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const { setting, constant } = require("../configuration");
const { Account, pool } = require("../model");

function hash(passcode, salt) {
  return crypto
    .pbkdf2Sync(
      passcode,
      salt,
      constant.SET_HASH.ITERATION,
      constant.SET_HASH.HASH_LENGTH,
      constant.SET_HASH.ALGORITHM
    )
    .toString(constant.SET_HASH.FORMAT);
}

async function authenticate(request, response, next) {
  const token = request.headers.authorization;
  if (!token) return response.status(401).send("Must request with a token.");

  let connection = null;
  try {
    const { email } = jwt.verify(token, setting.JWT_SECRET_KEY);
    connection = await pool.getConnection();

    const accounts = await Account.findByEmail(connection, email);
    const account = accounts.find((account) => account.email === email);

    if (account === null) throw new Error();

    if (
      account.state === constant.MAP_STATE.FROZEN ||
      account.state === constant.MAP_STATE.CANCELED
    )
      return response.status(401).send("The account is not in a valid state.");

    request.context = { ...account };
    if (setting.PRIVILEGED_EMAILS.includes(request.context.email))
      request.context.nobility++;
    next();
  } catch (error) {
    response.status(401).send(`Invalid token.\n${error.message}`);
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  hash,
  authenticate,
};
