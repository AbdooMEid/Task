const mongoose = require("mongoose");

const accessSchema = mongoose.Schema(
  {
    listID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "List",
    },
    access: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: { type: String},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Access", accessSchema);
