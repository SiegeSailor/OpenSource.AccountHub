import type { PoolConnection, RowDataPacket } from "mysql2/promise";

import settings from "settings";
import utilities from "utilities";

class Account implements Schema.IAccount {
  static readonly EMAIL_MIN_LENGTH = 3;
  static readonly PASSWORD_MIN_LENGTH = 12;
  static readonly REGEX_ONLY_LETTERS_DIGITS = /^[A-Za-z-9]+$/;
  static readonly REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  static readonly REGEX_ONE_BOTH_CASE_DIGIT_SPECIAL =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?;\[\]\\',./`~\-=])/;

  private _email = "";
  private _passcode = "";
  private _salt = "";
  private _state = "";
  private _createdAt = 0;
  private _updatedAt = 0;

  constructor(row: RowDataPacket) {
    this._email = row.email;
    this._passcode = row.passcode;
    this._salt = row.salt;
    this._state = row.state;
    this._createdAt = row.created_at;
    this._updatedAt = row.updated_at;
  }

  public get email() {
    return this._email;
  }

  public get passcode() {
    return this._passcode;
  }

  public get salt() {
    return this._salt;
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

  public get session(): Session.ISession {
    return {
      email: this._email,
      state: this._state,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  static validate(input: Pick<Schema.IAccount, "email" | "passcode">) {
    const account: typeof input = { email: "", passcode: "" };
    for (const key in input) {
      account[key] = input[key];
      switch (key) {
        case "email":
          if (input[key].length < this.EMAIL_MIN_LENGTH)
            throw new Error(
              `${key} have to be at least ${this.EMAIL_MIN_LENGTH} long.`
            );
          if (!this.REGEX_EMAIL.test(input[key]))
            throw new Error(`${key} is not a valid email address.`);
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
    email: string,
    passcode: string
  ) {
    const account = this.validate({ email, passcode });
    const salt = utilities.hash.salt();
    await connection.execute(
      "INSERT INTO account (email, passcode, salt) VALUES (?, ?, ?);",
      [account.email, hash(account.passcode, salt), salt]
    );
  }

  static async findByEmail(connection: PoolConnection, email: string) {
    const [rows] = await connection.execute(
      "SELECT * FROM account WHERE email = ?",
      [email]
    );
    return (rows as RowDataPacket[]).map((row) => {
      return new Account(row);
    });
  }
}

export default Account;
