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

  static validate(input) {
    for (const [key, value] of Object.entries(input)) {
      switch (key) {
        case "email":
          if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(value))
            throw new Error(`${value} is not a proper ${key}.`);
          break;
        case "username":
        case "passcode":
          if (value.length === 0 || value.length > 16)
            throw new Error(`${value} has incorrect length as ${key}.`);
          break;
        case "nobility":
          if (value <= 0) throw new Error(`${key} must be positive.`);
          break;
        case "state":
          if (
            ![
              constant.MAP_STATE.NORMAL,
              constant.MAP_STATE.FROZEN,
              constant.MAP_STATE.CANCELED,
            ].includes(value)
          )
            throw new Error(`${value} is not a valid ${key}.`);
          break;
        default:
          break;
      }
    }
  }

  static async create(connection, email, username, passcode) {
    this.validate({ email, username, passcode });

    const salt = crypto
      .randomBytes(constant.SET_HASH.SALT_LENGTH)
      .toString(constant.SET_HASH.FORMAT);
    await connection.execute(
      "INSERT INTO account (email, username, passcode, salt) VALUES (?, ?, ?, ?);",
      [email, username, permit.hash(passcode, salt), salt]
    );
  }

  static async update(connection, substitution, email) {
    this.validate(substitution);

    if (substitution.passcode) {
      const salt = crypto
        .randomBytes(constant.SET_HASH.SALT_LENGTH)
        .toString(constant.SET_HASH.FORMAT);

      substitution.passcode = permit.hash(substitution.passcode, salt);
      substitution.salt = salt;
    }
    /** UPDATE <table> SET ? WHERE <column> = ?; doesn't work here. */
    await connection.execute(
      `UPDATE account SET ${Object.entries(substitution).map((entry) => {
        return `${entry[0]} = '${entry[1]}'`;
      })} WHERE email = ?;`,
      [email]
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

  static async findAll(connection, limit, offset) {
    const [rows] = await connection.execute(
      "SELECT email, nobility, state, created_at, updated_at FROM account LIMIT ? OFFSET ? ORDER BY email;",
      [limit, offset]
    );
    return rows.map((row) => {
      return new Account(row);
    });
  }
}

module.exports = Account;
