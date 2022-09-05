const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    imgUrl: String,
    friends: {
      type: [{ name: String, id: mongoose.Schema.Types.ObjectId }],
      default: [],
    },
    friendRequests: {
      type: [{ name: String, id: mongoose.Schema.Types.ObjectId }],
      default: [],
    },
    sentRequests: {
      type: [{ name: String, id: mongoose.Schema.Types.ObjectId }],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
