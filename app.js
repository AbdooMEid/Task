"use strict";
const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const path = require("path");
const color = require("colors");
const logger = require("./log/logger");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const dbConnection = require("./config/dbConnection");
const port = 3000;
dotenv.config({ path: "config.env" });
app.use(helmet());
app.use(compression());

//connection DB
dbConnection();
//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
//env mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode : ${process.env.NODE_ENV}`);
}
// Mount route
app.use("/api/v1/task", require("./routes/index.routes"));

//handel Error 404 not found
app.use("*", (req, res) => {
  res.status(404).json("404 api Not Found");
});
// Handling 500
app.use("/500", function (error, req, res, next) {
  next(new Error(error));
});

//send the user to 500 page without shutting down the server
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send({ error: err.message });
  next(err);
});
app.listen(process.env.PORT || port, () =>
  logger.error(`Example app listening on port ${port}!`.underline.red.bold)
);
