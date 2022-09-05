const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((doc) => {
      console.log(
        `DB connection successfully! ${doc.connection.host}`.yellow.underline
          .bold
      );
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

module.exports = dbConnection;
