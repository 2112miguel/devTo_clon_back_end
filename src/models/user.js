const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schema = new Schema({
  firstName: { type: String, required: false, default: "nombre" },
  lastName: { type: String, required: false, default: "apellido" },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  imageUser: { type: String, required: false, default: "imagen" },
  role: { type: String, required: false, default: "client" },
});

module.exports = {
  schema,
  model: mongoose.model("User", schema),
};
