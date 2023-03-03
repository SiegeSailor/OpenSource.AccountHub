const { pool } = require("../model");
const { version } = require("../../package.json");

function format(result) {
  return {
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
}

async function connect(response, callback, reason) {
  let connection = null;
  try {
    connection = await pool.getConnection();
    const result = await callback(connection);
    if (result.constructor.name === "ServerResponse") {
      if (connection) {
        await connection.rollback();
        connection.release();
      }
      return;
    }

    const { json, xml } = format(result);
    response.status(200).format({
      /** JSON will be used if the user doesn't specify "accept". */
      json: function () {
        response.json(json);
      },
      xml: function () {
        response.send(xml);
      },
      default: function () {
        response
          .status(406)
          .send({ message: "The content type is not acceptable." });
      },
    });
  } catch (error) {
    if (connection) await connection.rollback();
    const { json, xml } = format({ message: `${reason} ${error.message}` });
    response.status(500).format({
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
  } finally {
    if (connection) connection.release();
  }
}

module.exports = { connect };
