const express = require("express");
const app = express();
const winston = require("winston");

require("./Startup/Logging")();
require("./Startup/Routes")(app);
require("./Startup/Db")();
require("./Startup/Config")();
require("./Startup/Validation");

const port = process.env.PORT;
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
