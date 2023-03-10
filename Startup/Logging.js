const winston = require("winston");
// require("winston-mongodb");
require("express-async-errors");

module.exports = () => {
  winston.exceptions.handle(
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  // winston.add(new winston.transports.File({ filename: "logfile.log" }));
  // winston.add(
  //   new winston.transports.MongoDB({ db: "mongodb://127.0.0.1/moovy" })
  // );
  // winston.add(new winston.transports.Console());
};
