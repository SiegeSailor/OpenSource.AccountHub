import type { RowDataPacket } from "mysql2/promise";

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
}

export default History;
