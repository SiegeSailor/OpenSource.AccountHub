const pool = require("./database");

pool.query;

module.exports = class {
  constructor() {}

  static async a() {
    const connection = await pool.getConnection();
    connection.beginTransaction;
    try {
      await connection.beginTransaction();

      const logQuery = "INSERT INTO logs (event) VALUES (?)";
      const userQuery = "INSERT INTO users (username, password) VALUES (?, ?)";
      const logParams = ["New user account created"];
      const userParams = [username, hashedPassword];

      await connection.query(logQuery, logParams);
      await connection.query(userQuery, userParams);

      await connection.commit();
      res.status(201).send("User account created successfully");
    } catch (error) {
      await connection.rollback();
      console.error(error);
      res.status(500).send("Error creating user account");
    } finally {
      connection.release();
    }
  }
};
