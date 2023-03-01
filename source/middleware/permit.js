const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const setting = require("../configuration/setting");
const constant = require("../configuration/constant");

function hash(password, salt) {
  return crypto
    .pbkdf2Sync(
      password,
      salt,
      constant.SET_HASH.ITERATION,
      constant.SET_HASH.HASH_LENGTH,
      constant.SET_HASH.ALGORITHM
    )
    .toString(constant.SET_HASH.FORMAT);
}

function authenticate(request, response, next) {
  const token = request.headers.authorization;
  if (!token) {
    response.status(401).send("Must request with a token.");
    return;
  }

  try {
    request.context = jwt.verify(token, setting.JWT_SECRET_KEY);
    next();
  } catch {
    response.status(401).send("Invalid token.");
  }
}

module.exports = {
  hash,
  authenticate,
};
