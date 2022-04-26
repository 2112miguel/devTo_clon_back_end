const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const schema = new Schema({
  imagen: { type: String, required: true },
  userId: { type: String, required: true },
  titlePost: { type: String, required: true },
  tags: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = {
  schema,
  model: mongoose.model("devto", schema),
};
