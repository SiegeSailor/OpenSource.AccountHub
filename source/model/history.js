const pool = require("./database");

module.exports = class {
  constructor() {}

  static async create(connection, category, content, email) {
    await connection.execute(
      "INSERT INTO history (category, content, email) VALUES (?, ?, ?)",
      [category, content, email]
    );
  }
};
