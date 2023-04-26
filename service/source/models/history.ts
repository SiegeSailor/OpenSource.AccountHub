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

  public get all() {
    return {
      identifier: this.identifier,
      category: this.category,
      content: this.content,
      accountEmail: this.accountEmail,
      createdAt: this.createdAt,
    };
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

  static async findByEmailRange(
    connection: PoolConnection,
    email: string,
    limit: number,
    page: number,
    start: number,
    end: number
  ) {
    const condition = { limit, page, start, end };
    for (const key in condition)
      if (Number.isNaN(condition[key]) || condition[key] <= 0)
        throw new TypeError(`${key} has to be a positive number.`);

    const offset = String((page - 1) * limit);
    const histories = (
      await connection.execute(
        "SELECT * FROM history WHERE account_email = ? AND created_at > ? AND created_at < ? ORDER BY created_at LIMIT ? OFFSET ?;",
        [email, new Date(start), new Date(end), String(limit), offset]
      )
    )[0];
    return (histories as RowDataPacket[]).map((row) => {
      return new History(row);
    });
  }
}

export default History;
