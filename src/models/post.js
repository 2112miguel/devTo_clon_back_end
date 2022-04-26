const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const schema = new Schema({
  commentsPost: { type: String, required: true },
  content: { type: String, required: true },
  datePost: { type: String, required: true },
  image: { type: String, required: true },
  imageUser: { type: String, required: false },
  userId: { type: String, required: false },
  titlePost: { type: String, required: true },
  tags: { type: String, required: true },
  reactionsPost: { type: String, require: true },
  timeReadP: { type: String, required: true },
});

module.exports = {
  schema,
  model: mongoose.model("devto", schema),
};
