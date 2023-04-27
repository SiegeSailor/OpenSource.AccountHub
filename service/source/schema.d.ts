declare module Schema {
  interface IAccount {
    email: string;
    passcode: string;
    privileges: number[];
    salt: string;
    state: string;
    createdAt: number;
    updatedAt: number;
  }

  interface IHistory {
    identifier: number;
    resource: string;
    content: string;
    email: string;
    createdAt: number;
  }
}
