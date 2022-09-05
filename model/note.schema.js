const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    listID : {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "List",
    },
    doneTask:{type : mongoose.Schema.Types.Boolean , default : false , required : [true , 'check the note']},
    titleNote: { type: String, required: [true, "please add some text"] },
    descNote : {type: String},
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
