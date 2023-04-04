import mysql from "mysql2/promise";

import settings from "settings";

export default mysql.createPool({
  host: settings.environment.DATABASE_HOST,
  user: settings.environment.DATABASE_USER,
  password: settings.environment.DATABASE_PASSWORD,
  database: "main",
  connectionLimit: settings.environment.DATABASE_CONNECTION_LIMIT,
  port: 3306,
});
