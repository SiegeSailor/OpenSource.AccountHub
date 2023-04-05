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

const store = new RedisStore({
  client,
  prefix: settings.constants.Session.PREFIX,
});

async function authenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const a = request.headers.cookie || "";
  const b = await client.get(`${a.split("=")[1]}`);
  console.log(b);
  if (request.session.cookie[settings.constants.Session.USERNAME]) next();
  else response.status(401).send(utilities.format.response("Invalid session."));
}

export default {
  client,
  store,
  session: session({
    store,
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
