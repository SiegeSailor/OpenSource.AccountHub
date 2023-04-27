import type { PoolConnection, RowDataPacket } from "mysql2/promise";

class History implements Schema.IHistory {
  private _identifier: number;
  private _resource: string;
  private _content: string;
  private _email: string;
  private _createdAt: number;

  constructor(row: RowDataPacket) {
    this._identifier = row.identifier;
    this._resource = row.resource;
    this._content = row.content;
    this._email = row.email;
    this._createdAt = Date.parse(row.created_at);
  }

  public get identifier() {
    return this._identifier;
  }

  public get resource() {
    return this._resource;
  }

  public get content() {
    return this._content;
  }

  public get email() {
    return this._email;
  }

  public get createdAt() {
    return this._createdAt;
  }

  public get response() {
    return {
      identifier: this.identifier,
      resource: this.resource,
      content: this.content,
      email: this.email,
      createdAt: this.createdAt,
    };
  }

  static async insert(
    connection: PoolConnection,
    resource: string,
    content: string | null,
    email: string
  ) {
    await connection.execute(
      "INSERT INTO history (resource, content, email) VALUES (?, ?, ?);",
      [resource, content, email]
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
        "SELECT * FROM history WHERE email = ? AND created_at > ? AND created_at < ? ORDER BY created_at LIMIT ? OFFSET ?;",
        [email, new Date(start), new Date(end), String(limit), offset]
      )
    )[0];
    return (histories as RowDataPacket[]).map((row) => {
      return new History(row);
    });
  }
}

export default History;
