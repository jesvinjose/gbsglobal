const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true, // Removes leading and trailing whitespace
    },
    mobile: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
    },
    place: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
