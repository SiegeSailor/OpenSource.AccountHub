const jwt = require("jsonwebtoken");

const { Account, History } = require("../model");
const { setting, constant } = require("../configuration");
const { permit } = require("../middleware");
const { connect } = require("../utility");

module.exports = async function (request, response) {
  const { username, passcode } = request.body;

  await connect(
    response,
    async function (connection) {
      if (!username || !passcode)
        return {
          _status: 400,
          message: "Must fill all necessary fields.",
        };

      const account = (await Account.findByUsername(connection, username))[0];

      if (!account)
        return {
          _status: 404,
          message: "No account found with such username.",
        };

      if (account.passcode !== permit.hash(passcode, account.salt))
        return {
          _status: 401,
          message: "Incorrect passcode.",
        };

      switch (account.state) {
        case constant.MAP_STATE.FROZEN:
          return {
            _status: 403,
            message: "This account has been frozen.",
          };
        case constant.MAP_STATE.CANCELED:
          return {
            _status: 403,
            message: "This account has been canceled.",
          };
        default:
          break;
      }

      await History.create(
        connection,
        constant.MAP_CATEGORY.ACCOUNT,
        "Logged in.",
        account.email
      );
      return {
        token: jwt.sign({ email: account.email }, setting.JWT_SECRET_KEY, {
          expiresIn: constant.TOKEN_EXPIRE_IN,
        }),
      };
    },
    "Failed to login."
  );
};
