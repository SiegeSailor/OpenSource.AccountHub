declare module Session {
  interface ISession {
    email: string;
    state: string;
    privileges: number[];
    createdAt: number;
    updatedAt: number;
  }
}
