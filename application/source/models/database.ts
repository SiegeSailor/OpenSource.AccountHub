import mysql from "mysql2/promise";

import settings from "settings";

export default mysql.createPool({
  host: settings.DATABASE_HOST,
  user: settings.DATABASE_USER,
  password: settings.DATABASE_PASSWORD,
  database: settings.DATABASE_DATABASE,
  connectionLimit: settings.DATABASE_CONNECTION_LIMIT,
});
