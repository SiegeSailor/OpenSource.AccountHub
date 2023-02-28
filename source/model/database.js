const mysql = require("mysql2/promise");

const setting = require("../configuration/setting");

const connection = mysql.createPool({
  host: setting.MYSQL_HOST,
  user: setting.MYSQL_USER,
  password: setting.MYSQL_PASSWORD,
  database: setting.MYSQL_DATABASE,
  connectionLimit: Number(setting.MYSQL_CONNECTION_LIMIT),
});

module.exports = connection;
