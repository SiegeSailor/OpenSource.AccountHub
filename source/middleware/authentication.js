const jwt = require("jsonwebtoken");

const setting = require("../configuration/setting");

module.exports = function (request, response, next) {
  const token = request.headers.authorization;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, setting.JWT_SECRET_KEY);
      req.userId = decodedToken.userId;
      next();
      return;
    } catch (error) {
      console.error(error);
      return res.status(401).send("Unauthorized");
    }

    if (!username || !password) {
      return res.status(400).send("Username and password are required");
    }

    const query = "SELECT * FROM users WHERE username = ?";
    const params = [username];
    pool.query(query, params, async (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
      }

      if (results.length === 0) {
        return res.status(401).send("Unauthorized");
      }

      const user = results[0];

      try {
        if (await bcrypt.compare(password, user.password)) {
          const token = jwt.sign({ userId: user.id }, secretKey);
          req.userId = user.id;
          req.token = token;
          next();
        } else {
          res.status(401).send("Unauthorized");
        }
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });
  }

  const { username, password, email } = request.body;
};
