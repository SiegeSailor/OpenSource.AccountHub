const crypto = require("crypto");

const { permit } = require("../middleware");
const { constant } = require("../configuration");

class Account {
  constructor({
    email,
    username,
    passcode,
    salt,
    nobility,
    state,
    created_at,
    updated_at,
  }) {
    this.email = email;
    this.username = username;
    this.passcode = passcode;
    this.salt = salt;
    this.nobility = nobility;
    this.state = state;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
  }

  static async create(connection, email, username, password) {
    const salt = crypto
      .randomBytes(constant.SET_HASH.SALT_LENGTH)
      .toString(constant.SET_HASH.FORMAT);
    const passcode = permit.hash(password, salt);
    await connection.execute(
      "INSERT INTO account (email, username, passcode, salt) VALUES (?, ?, ?, ?);",
      [email, username, passcode, salt]
    );
  }

  static async findByEmail(connection, email) {
    const [rows] = await connection.execute(
      "SELECT * FROM account WHERE email = ?;",
      [email]
    );
    return rows.map((row) => {
      return new Account(row);
    });
  }

  static async findByUsername(connection, username) {
    const [rows] = await connection.execute(
      "SELECT * FROM account WHERE username = ?;",
      [username]
    );
    return rows.map((row) => {
      return new Account(row);
    });
  }

  static async findAll(connection) {
    const [rows] = await connection.execute("SELECT * FROM account;");
    return rows.map((row) => {
      return new Account(row);
    });
  }
}

module.exports = Account;
