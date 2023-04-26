declare module Schema {
  interface IAccount {
    email: string;
    passcode: string;
    salt: string;
    state: string;
    createdAt: number;
    updatedAt: number;
  }

  interface IHistory {
    identifier: number;
    category: string;
    content: string;
    accountEmail: string;
    createdAt: number;
  }
}
