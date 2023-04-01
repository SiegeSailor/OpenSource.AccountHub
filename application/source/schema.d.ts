declare module Schema {
  interface IAccount {
    username: string;
    passcode: string;
    salt: string;
    nobility: number;
    state: string;
    created_at: number;
    updated_at: number;
  }

  interface IHistory {
    identifier: number;
    category: string;
    content: string;
    username: string;
    created_at: number;
  }
}
