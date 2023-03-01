const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const { setting, constant } = require("../configuration");

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
    next();
  } catch {
    response.status(401).send("Invalid token.");
  } finally {
  }
}

module.exports = {
  hash,
  authenticate,
};
