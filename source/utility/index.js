const { pool } = require("../model");
const { version } = require("../../package.json");

async function connect(response, callback, message) {
  let connection = null;
  try {
    connection = await pool.getConnection();
    const { json, xml } = await callback(connection);
    response.status(200).format({
      json: function () {
        response.json(json);
      },
      xml: function () {
        response.send(`<?xml version="${version}"?><content>${xml}</content>`);
      },
      default: function () {
        response.status(406).send("The content type is not acceptable.");
      },
    });
  } catch (error) {
    if (connection) await connection.rollback();
    response.status(500).send(`${message}\n${error.message}`);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { connect };
