import type { PoolConnection, RowDataPacket } from "mysql2/promise";

import type { Category } from "settings/constants";

class History implements Schema.IHistory {
  private _identifier: number;
  private _category: string;
  private _content: string;
  private _username: string;
  private _createdAt: number;

  constructor(row: RowDataPacket) {
    this._identifier = row.identifier;
    this._category = row.category;
    this._content = row.content;
    this._username = row.username;
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

  public get username() {
    return this._username;
  }

  public get createdAt() {
    return this._createdAt;
  }

  static async insert(
    connection: PoolConnection,
    category: Category,
    content: string,
    username: string
  ) {
    await connection.execute(
      "INSERT INTO history (category, content, username) VALUES (?, ?, ?);",
      [category, content, username]
    );
  }
}

export default History;
