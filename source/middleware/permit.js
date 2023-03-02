const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const { setting, constant } = require("../configuration");
const { verifyState } = require("../utility");

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

  try {
    request.context = jwt.verify(token, setting.JWT_SECRET_KEY);
    if (await verifyState(request.context.email))
      return response.status(401).send("The account is not in a valid state.");
    if (setting.PRIVILEGED_EMAILS.includes(request.context.email))
      request.context.nobility++;
    next();
  } catch (error) {
    response.status(401).send(`Invalid token.\n${error.message}`);
  }
}

module.exports = {
  hash,
  authenticate,
};
