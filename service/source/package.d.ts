import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    export interface Request {
      session?: Session.ISession;
      payload?: JwtPayload;
    }
  }
}

export default {};
