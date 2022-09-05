const winston = require("winston");
require("winston-mongodb");
const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: "error.log",
      level: "error",
      format: winston.format.json(
        winston.format.timestamp(),
      ),
    }),
    new winston.transports.MongoDB(
      {
        level: "error",
        options: { useUnifiedTopology: true },
        db: "mongodb+srv://admin:admin@cluster0.cz5b9.mongodb.net/Task?retryWrites=true&w=majority",
      },
      winston.format.json()
    ),
  ],
});
module.exports = logger;
