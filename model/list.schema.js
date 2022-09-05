const mongoose = require("mongoose");

const listSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    titleList: { type: String, required: [true, "please add some text"] },
    color: { type: String, default: "#e2e2e2" },
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", listSchema);
