import type { Request, Response, NextFunction } from "express";
import session from "express-session";
import Redis from "ioredis";
import RedisStore from "connect-redis";

import utilities from "utilities";
import settings from "settings";

const client = new Redis({
  host: settings.environment.SESSION_HOST,
  port: settings.environment.SESSION_PORT,
});

async function authenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (request.session[settings.constants.Session.USERNAME]) next();
  else response.status(401).send(utilities.format.response("Invalid session."));
}

export default {
  client,
  session: session({
    store: new RedisStore({
      client,
      prefix: settings.constants.Session.PREFIX,
    }),
    name: settings.constants.Session.NAME,
    secret: settings.environment.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: settings.environment.HTTPS,
      maxAge: settings.constants.Milliseconds.DAY,
    },
  }),
  authenticate,
};
