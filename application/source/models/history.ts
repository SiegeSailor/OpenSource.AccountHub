export default class History {
  identifier: number;
  category: string;
  content: string;
  username: string;
  createdAt: number;

  constructor(schema: Schema.IHistory) {
    this.identifier = schema.identifier;
    this.category = schema.category;
    this.content = schema.content;
    this.username = schema.username;
    this.createdAt = schema.created_at;
  }
}
