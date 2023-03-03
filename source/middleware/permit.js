const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const { setting, constant } = require("../configuration");
const { Account, pool } = require("../model");
const { connect } = require("../utility");

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

  await connect(
    response,
    async function (connection) {
      if (!token)
        return {
          _status: 401,
          message: "Must request with a token.",
        };

      const { email } = jwt.verify(token, setting.JWT_SECRET_KEY);
      const accounts = await Account.findByEmail(connection, email);
      const account = accounts.find((account) => account.email === email);

      if (account === null)
        return {
          _status: 404,
          message: "No such account.",
        };

      if (
        account.state === constant.MAP_STATE.FROZEN ||
        account.state === constant.MAP_STATE.CANCELED
      )
        return {
          _status: 401,
          message: "The account is not in a valid state.",
        };

      request.context = { ...account };
      if (setting.PRIVILEGED_EMAILS.includes(request.context.email))
        request.context.nobility++;
      next();
    },
    "Invalid token."
  );
}

module.exports = {
  hash,
  authenticate,
};
