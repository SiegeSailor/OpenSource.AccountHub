declare global {
  namespace Express {
    export interface Request {
      session?: Session.ISession;
      identifier?: string;
    }
  }
}

export default {};
