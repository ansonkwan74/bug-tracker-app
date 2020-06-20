const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    //Fields
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    //Logs time of creation/changes
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
