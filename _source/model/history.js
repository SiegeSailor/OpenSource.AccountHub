class History {
  constructor({ identifier, category, content, email, created_at }) {
    this.identifier = identifier;
    this.category = category;
    this.content = content;
    this.email = email;
    this.createdAt = created_at;
  }

  static async create(connection, category, content, email) {
    await connection.execute(
      "INSERT INTO history (category, content, email) VALUES (?, ?, ?);",
      [category, content, email]
    );
  }

  static async findByEmail(connection, email, limit, page) {
    const offset = (page - 1) * limit;
    const [rows] = await connection.execute(
      `SELECT * FROM history WHERE email = ? ORDER BY email LIMIT ?${
        offset ? " OFFSET ?" : ""
      };`,
      offset ? [email, limit, offset] : [email, limit]
    );
    return rows.map((row) => {
      return new History(row);
    });
  }
}

module.exports = History;
