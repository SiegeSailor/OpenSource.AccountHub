const { pool } = require("../model");
const { version } = require("../../package.json");

function format(response, status, result) {
  const { json, xml } = {
    json: result,
    xml: `<?xml version="${version}"?><content>${Object.entries(result)
      .map(([key, value]) => {
        let context = "";
        if (value.constructor.name === "Array") {
          context = value
            .map(
              (item) =>
                `<item>${Object.entries(item)
                  .map(([key, value]) => `<${key}>${value}</${key}>`)
                  .join("")}</item>`
            )
            .join("");
        } else if (typeof value === "object") {
          context = Object.entries(value)
            .map(([key, value]) => `<${key}>${value}</${key}>`)
            .join("");
        } else {
          context = value;
        }
        return `<${key}>${context}</${key}>`;
      })
      .join("")}</content>`,
  };
  response.status(status).format({
    json: function () {
      response.json(json);
    },
    xml: function () {
      response.send(xml);
    },
    default: function () {
      response.json(json);
    },
  });
}

/** JSON will be used if the user doesn't specify "accept: application/xml". */
async function connect(response, callback, reason) {
  let connection = null;
  try {
    connection = await pool.getConnection();
    const result = await callback(connection);
    if (result._status) {
      format(response, result._status, { message: result.message });
      if (connection) {
        await connection.rollback();
        connection.release();
      }
      return;
    }

    format(response, 200, result);
  } catch (error) {
    if (connection) await connection.rollback();
    format(response, 500, { message: `${reason} ${error.message}` });
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { connect };
