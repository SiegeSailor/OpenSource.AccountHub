import type { PoolConnection, RowDataPacket } from "mysql2/promise";

import type { Category } from "settings/constants";

class History implements Schema.IHistory {
  identifier: number;
  category: string;
  content: string;
  username: string;
  createdAt: number;

  constructor(row: RowDataPacket) {
    this.identifier = row.identifier;
    this.category = row.category;
    this.content = row.content;
    this.username = row.username;
    this.createdAt = row.created_at;
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
