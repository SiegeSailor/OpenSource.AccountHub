export default class {
  email = "";
  username = "";
  passcode = "";
  salt = "";
  nobility = 0;
  state = "";
  createdAt = 0;
  updatedAt = 0;

  constructor(props: {
    email: string;
    username: string;
    passcode: string;
    salt: string;
    nobility: number;
    state: string;
    created_at: number;
    updated_at: number;
  }) {
    this.email = props.email;
    this.username = props.username;
    this.passcode = props.passcode;
    this.salt = props.salt;
    this.nobility = props.nobility;
    this.state = props.state;
    this.createdAt = props.created_at;
    this.updatedAt = props.updated_at;
  }
}
