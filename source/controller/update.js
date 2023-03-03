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
        return response
          .status(403)
          .send("Your nobility is too low for this operation.");

      /** So far only allow username and passcode to be modified by users. */
      const keys = Object.keys(request.body);
      for (const key of keys) {
        switch (key) {
          case "username":
          case "passcode":
            if (!request.body[key])
              return response.status(400).send(`${key} can't be empty.`);
            break;
          case "nobility":
            if (request.params.email === email)
              return response
                .status(403)
                .send(`${key} can't be changed by the owner self.`);
            if (!request.body[key])
              return response.status(400).send(`${key} can't be empty.`);
            break;
          default:
            return response
              .status(400)
              .send("One or all of the keys is not modifiable.");
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
