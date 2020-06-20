const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const issueSchema = new Schema(
  {
    username: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    deadline: { type: Date, required: true },
    completed: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const Issue = mongoose.model("Issue", issueSchema);

module.exports = Issue;
