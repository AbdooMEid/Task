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
//route
app.use("/api/v1/task", require("./routes/register.routes"));
app.use("/api/v1/task", require("./routes/login.routes"));
app.use("/api/v1/task", require("./routes/list.routes"));
app.use("/api/v1/task", require("./routes/getList.routes"));
app.use("/api/v1/task", require("./routes/editList.routes"));
app.use("/api/v1/task", require("./routes/deleteList.routes"));
app.use("/api/v1/task", require("./routes/addNote.routes"));
app.use("/api/v1/task", require("./routes/getAllNote.routes"));
app.use("/api/v1/task", require("./routes/editNote.routes"));
app.use("/api/v1/task", require("./routes/deleteNote.routes"));
app.use("/api/v1/task", require("./routes/addFrindes.routes"));
app.use("/api/v1/task", require("./routes/cancel.routes"));
app.use("/api/v1/task", require("./routes/accept.routes"));
app.use("/api/v1/task", require("./routes/rejected.routes"));
app.use("/api/v1/task", require("./routes/getAllFriend.routes"));
app.use("/api/v1/task", require("./routes/getFriendRequests.routes"));
app.use("/api/v1/task", require("./routes/sentRequests.routes"));
app.use("/api/v1/task", require("./routes/search.routes"));
app.use("/api/v1/task", require("./routes/deleteFriend.routes"));
app.use("/api/v1/task", require("./routes/access.routes"));
app.use("/api/v1/task", require("./routes/removeAccess.routes"));
app.use("/api/v1/task", require("./routes/getAccess.routes"));
app.use("/api/v1/task", require("./routes/getListAccess.routes"));
//handel Error 404 not found
app.use("*", (req, res) => {
  res.status(404).json("404 api Not Found");
});
// Handling 500
app.use(function (error, req, res, next) {
  res.status(500).render("500");
});

//send the user to 500 page without shutting down the server
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {},
  });
});
app.listen(process.env.PORT || port, () =>
  logger.error(`Example app listening on port ${port}!`.underline.red.bold)
);
