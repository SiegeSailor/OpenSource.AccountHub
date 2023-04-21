import type { PoolConnection, RowDataPacket } from "mysql2/promise";

import settings from "settings";
import utilities from "utilities";

class Account implements Schema.IAccount {
  static readonly USERNAME_MIN_LENGTH = 8;
  static readonly PASSWORD_MIN_LENGTH = 16;
  static readonly REGEX_ONLY_LETTERS_DIGITS = /^[A-Za-z-9]+$/;
  static readonly REGEX_ONE_BOTH_CASE_DIGIT_SPECIAL =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?;\[\]\\',./`~\-=])/;

  private _username = "";
  private _passcode = "";
  private _salt = "";
  private _nobility = settings.constants.ENobility.NAIVE;
  private _state = "";
  private _createdAt = 0;
  private _updatedAt = 0;

  constructor(row: RowDataPacket) {
    this._username = row.username;
    this._passcode = row.passcode;
    this._salt = row.salt;
    this._nobility = row.nobility;
    this._state = row.state;
    this._createdAt = row.created_at;
    this._updatedAt = row.updated_at;
  }

  public get username() {
    return this._username;
  }

  public get passcode() {
    return this._passcode;
  }

  public get salt() {
    return this._salt;
  }

  public get nobility() {
    return this._nobility;
  }

  public get state() {
    return this._state;
  }

  public get createdAt() {
    return this._createdAt;
  }

  public get updatedAt() {
    return this._updatedAt;
  }

  public get insensitive(): Session.ISession {
    return {
      username: this._username,
      nobility: this._nobility,
      state: this._state,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  static validate(input: Pick<Schema.IAccount, "username" | "passcode">) {
    const account: typeof input = { username: "", passcode: "" };
    for (const key in input) {
      account[key] = input[key];
      switch (key) {
        case "username":
          if (input[key].length < this.USERNAME_MIN_LENGTH)
            throw new Error(
              `${key} have to be at least ${this.USERNAME_MIN_LENGTH} long.`
            );
          if (!this.REGEX_ONLY_LETTERS_DIGITS.test(input[key]))
            throw new Error(`${key} can only contain letters and numbers.`);
          break;
        case "passcode":
          if (input[key].length < this.PASSWORD_MIN_LENGTH)
            throw new Error(
              `${key} have to be at least ${this.PASSWORD_MIN_LENGTH} long.`
            );
          if (!this.REGEX_ONE_BOTH_CASE_DIGIT_SPECIAL.test(input[key]))
            throw new Error(
              `${key} has to contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.`
            );
          break;
      }
    }
    return account;
  }

  static async insert(
    connection: PoolConnection,
    hash: typeof utilities.hash.password,
    username: string,
    passcode: string
  ) {
    const account = this.validate({ username, passcode });
    const salt = utilities.hash.salt();
    await connection.execute(
      "INSERT INTO account (username, passcode, salt) VALUES (?, ?, ?);",
      [account.username, hash(account.passcode, salt), salt]
    );
  }

  static async findByUsername(connection: PoolConnection, username: string) {
    const [rows] = await connection.execute(
      "SELECT * FROM account WHERE username = ?",
      [username]
    );
    return (rows as RowDataPacket[]).map((row) => {
      return new Account(row);
    });
  }
}

export default Account;
