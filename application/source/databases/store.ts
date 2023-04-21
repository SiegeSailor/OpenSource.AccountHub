import Redis from "ioredis";

import settings from "settings";

export default new Redis({
  host: settings.environment.SESSION_HOST,
  port: settings.environment.SESSION_PORT,
});
