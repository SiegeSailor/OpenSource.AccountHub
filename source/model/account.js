const { hash } = require("../middleware/permit");

class Account {
  constructor({
    email,
    username,
    passcode,
    salt,
    privilege_level,
    use_status,
    created_at,
    updated_at,
  }) {
    this.email = email;
    this.username = username;
    this.passcode = passcode;
    this.salt = salt;
    this.privilegeLevel = privilege_level;
    this.useStatus = use_status;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
  }

  static async create(connection, email, username, password) {
    const { passcode, salt } = hash(password);
    await connection.execute(
      "INSERT INTO account (email, username, passcode, salt) VALUES (?, ?, ?, ?)",
      [email, username, passcode, salt]
    );
  }

  static async findByEmail(connection, email) {
    const [rows] = await connection.execute(
      "SELECT * FROM account WHERE email = ?",
      [email]
    );
    if (rows.length === 0) throw new Error("The email doesn't exist.");

    return new Account(rows[0]);
  }
}

module.exports = Account;
