declare module Schema {
  interface IAccount {
    username: string;
    passcode: string;
    salt: string;
    nobility: number;
    state: string;
    createdAt: number;
    updatedAt: number;
  }

  interface IHistory {
    identifier: number;
    category: string;
    content: string;
    username: string;
    createdAt: number;
  }
}
