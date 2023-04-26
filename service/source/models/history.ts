import type { PoolConnection, RowDataPacket } from "mysql2/promise";

import type { EHistoryCategory } from "settings/constants";

class History implements Schema.IHistory {
  private _identifier: number;
  private _category: string;
  private _content: string;
  private _accountEmail: string;
  private _createdAt: number;

  constructor(row: RowDataPacket) {
    this._identifier = row.identifier;
    this._category = row.category;
    this._content = row.content;
    this._accountEmail = row.account_email;
    this._createdAt = row.created_at;
  }

  public get identifier() {
    return this._identifier;
  }

  public get category() {
    return this._category;
  }

  public get content() {
    return this._content;
  }

  public get accountEmail() {
    return this._accountEmail;
  }

  public get createdAt() {
    return this._createdAt;
  }

  static async insert(
    connection: PoolConnection,
    category: EHistoryCategory,
    content: string,
    accountEmail: string
  ) {
    await connection.execute(
      "INSERT INTO history (category, content, account_email) VALUES (?, ?, ?);",
      [category, content, accountEmail]
    );
  }
}

export default History;
