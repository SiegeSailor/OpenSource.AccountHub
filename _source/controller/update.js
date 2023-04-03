const { Account, History } = require("../model");
const { constant } = require("../configuration");
const { permit } = require("../middleware");
const { connect } = require("../utility");

module.exports = async function (request, response) {
  const { email, nobility } = request.context;

  await connect(
    response,
    async function (connection) {
      if (
        request.params.email !== email &&
        nobility <= constant.SET_NOBILITY.NAIVE
      )
        return {
          _status: 403,
          message: "Your nobility is too low for this operation.",
        };

      /** So far only allow username and passcode to be modified by users. */
      const keys = Object.keys(request.body);
      for (const key of keys) {
        switch (key) {
          case "username":
          case "passcode":
            if (!request.body[key])
              return {
                _status: 400,
                message: `${key} can't be empty.`,
              };
            break;
          case "nobility":
            if (request.params.email === email)
              return {
                _status: 403,
                message: `${key} can't be changed by the owner self.`,
              };
            if (!request.body[key])
              return {
                _status: 400,
                message: `${key} can't be empty.`,
              };
            break;
          default:
            return {
              _status: 400,
              message: "One or all of the keys is not modifiable.",
            };
        }
      }

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
      return {
        message: `Successfully updated profile with ${keys} for ${request.params.email}.`,
      };
    },
    `Failed to update profile with ${keys} for ${email}.`
  );
};
