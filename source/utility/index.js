const { Account, pool } = require("../model");
const { constant } = require("../configuration");

module.exports = {
  verifyState: async function (email) {
    let connection = null;
    try {
      connection = await pool.getConnection();
      const accounts = await Account.findByEmail(connection, email);

      return !!accounts.find(
        (account) =>
          account.email === email &&
          (account.state === constant.MAP_STATE.FROZEN ||
            account.state === constant.MAP_STATE.CANCELED)
      );
    } catch (error) {
      throw error;
    } finally {
      if (connection) connection.release();
    }
  },
};
