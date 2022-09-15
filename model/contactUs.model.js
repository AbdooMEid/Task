const mongoose = require("mongoose");
const contactSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("contact", contactSchema);
