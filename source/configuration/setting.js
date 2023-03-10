const {
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  MYSQL_CONNECTION_LIMIT,
  JWT_SECRET_KEY,
  PRIVILEGED_EMAILS,
  PORT,
} = process.env;

module.exports = {
  NAME: "Account Hub",
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  MYSQL_CONNECTION_LIMIT: Number(MYSQL_CONNECTION_LIMIT),
  JWT_SECRET_KEY,
  PRIVILEGED_EMAILS: PRIVILEGED_EMAILS.split(","),
  PORT: Number(PORT),
};
