class History {
  constructor({ identifier, category, content, created_at, email }) {
    this.identifier = identifier;
    this.category = category;
    this.content = content;
    this.createdAt = created_at;
    this.email = email;
  }

  static async create(connection, category, content, email) {
    await connection.execute(
      "INSERT INTO history (category, content, email) VALUES (?, ?, ?);",
      [category, content, email]
    );
  }

  static async findByEmail(connection, email) {
    const [rows] = await connection.execute(
      "SELECT * FROM history WHERE email = ? ORDER BY identifier;",
      [email]
    );
    return rows.map((row) => {
      return new History(row);
    });
  }
}

module.exports = History;
