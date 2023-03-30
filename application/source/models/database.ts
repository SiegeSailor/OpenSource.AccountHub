import mysql from "mysql2/promise";

import settings from "settings";

export default mysql.createPool({
  host: settings.processes.DATABASE_HOST,
  user: settings.processes.DATABASE_USER,
  password: settings.processes.DATABASE_PASSWORD,
  database: settings.processes.DATABASE_NAME,
  connectionLimit: settings.processes.DATABASE_CONNECTION_LIMIT,
});
