const express = require("express");

const application = express();

application.use(express.json());
application.use(express.urlencoded({ extended: true }));

application.use("/", require("./route/index"));
application.use(function (request, response) {
  response.status(404).send(`Route "${encodeURI(request.url)}" doesn't exist.`);
});

application.listen(3000, function () {
  console.log("http://localhost:3000");
});
