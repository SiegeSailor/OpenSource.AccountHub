import type { PoolConnection, RowDataPacket } from "mysql2/promise";

class Account {
  email = "";
  username = "";
  passcode = "";
  salt = "";
  nobility = 1;
  state = "";
  createdAt = 0;
  updatedAt = 0;

  constructor(schema: Schema.IAccount) {
    this.username = schema.username;
    this.passcode = schema.passcode;
    this.salt = schema.salt;
    this.nobility = schema.nobility;
    this.state = schema.state;
    this.createdAt = schema.created_at;
    this.updatedAt = schema.updated_at;
  }

  static toObject(row: RowDataPacket) {
    return {
      email: row.email,
      username: row.username,
      passcode: row.passcode,
      salt: row.salt,
      nobility: row.nobility,
      state: row.state,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  static async findByUsername(connection: PoolConnection, username: string) {
    const [rows] = await connection.execute(
      "SELECT * FROM account WHERE username = ?",
      [username]
    );
    return (rows as RowDataPacket[]).map((row) => {
      return new Account(Account.toObject(row));
    });
  }
}

export default Account;
