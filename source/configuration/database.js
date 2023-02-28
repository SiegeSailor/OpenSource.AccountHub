const mysql = require("mysql");

const setting = require("./setting");

const connection = mysql.createConnection({
  host: setting.MYSQL_HOST,
  user: setting.MYSQL_USER,
  password: setting.MYSQL_PASSWORD,
  database: setting.MYSQL_DATABASE,
});

module.exports = connection;
