const mongoose = require("mongoose");
const validator = require("../validations/validator");
const empresaSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  name: {
    type: String,
    required: [true, "El nombre de la empresa es obligatorio"],
    unique: true,
    trim: true,
  },
  addresses: [{ type: String, required: true, trim: true }],
  phone: {
    type: String,
    validate: [
      validator.onlyNumbers,
      "El telefono debe contener solo numeros, y no debe contener espacios",
    ],
    trim: true,
  },
});

module.exports = mongoose.model("Empresa", empresaSchema, "empresas");
