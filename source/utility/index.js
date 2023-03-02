const { Account, pool } = require("../model");
const { constant } = require("../configuration");

module.exports = {
  seeFrozen: async function (email) {
    let connection = null;
    try {
      connection = await pool.getConnection();
      const accounts = await Account.findByEmail(
        connection,
        request.params.email
      );

      return !!accounts.find(
        (account) =>
          account.email === email && account.state === constant.MAP_STATE.FROZEN
      );
    } catch (error) {
      if (connection) await connection.rollback();
      throw error;
    } finally {
      if (connection) connection.release();
    }
  },
};
