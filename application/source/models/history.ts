export default class History {
  identifier: number;
  category: string;
  content: string;
  email: string;
  createdAt: number;

  constructor(props: {
    identifier: number;
    category: string;
    content: string;
    email: string;
    created_at: number;
  }) {
    this.identifier = props.identifier;
    this.category = props.category;
    this.content = props.content;
    this.email = props.email;
    this.createdAt = props.created_at;
  }
}
