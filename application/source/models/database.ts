import mysql from "mysql2/promise";

import settings from "settings";

export default mysql.createPool({
  host: settings.environment.DATABASE_HOST,
  user: settings.environment.DATABASE_USER,
  password: settings.environment.DATABASE_PASSWORD,
  database: settings.environment.DATABASE_NAME,
  connectionLimit: settings.environment.DATABASE_CONNECTION_LIMIT,
});
