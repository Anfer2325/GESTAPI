const mongoose = require("mongoose");

const gestorSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  email: {
    type: String,
    required: [true, "El email es un campo obligatorio"],
  },
  name: {
    type: String,
    required: [true, "El nombre es un campo obligatorios"],
  },
  password: { type: String, required: "true" },
  username: { type: String, unique: true },
  bufete: { type: String, required: [true, "El bufete es obligatorio"] },
});

module.exports = mongoose.model("Gestor", gestorSchema, "gestores");
