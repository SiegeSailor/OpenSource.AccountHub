import type { Request, Response, NextFunction } from "express";
import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";

import utilities from "utilities";
import settings from "settings";

async function authenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (request.session[settings.constants.Session.ACCOUNT]) next();
  else response.status(401).send(utilities.format.response("Invalid session."));
}

const RedisStore = connectRedis(session);

export default {
  authenticate,
  session: session({
    store: new RedisStore({
      client: new Redis({
        host: settings.environment.SESSION_HOST,
        port: settings.environment.SESSION_PORT,
      }),
    }),
    secret: settings.environment.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: settings.environment.HTTPS,
      maxAge: settings.constants.Milliseconds.DAY,
    },
  }),
};
