const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    listID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "List",
    },
    doneTask: {
      type: ["open" , "inProgress" , "complete"],
      default: "open",
      required: [true, "check the note"],
    },
    titleNote: { type: String, required: [true, "please add some text"] },
    descNote: { type: String },
    expDate: String,
    noteImg: [String],
    noteFile: [String],
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
