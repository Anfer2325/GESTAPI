const mongoose = require("mongoose");
const validator = require("../validations/validator");
const gastosLegalesSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String, trim: true, required: true },
  code: { type: String, trim: true, required: true },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  cuenta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cuenta",
    required: true,
    validate: [
      (val) => validator.idExist("Cuenta", val),
      "La cuenta debe existir",
    ],
  },
  bufete: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bufete",
    required: true,
    validate: [(val) => validator.idExist("Bufete", val)],
  },
  gestor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gestor",
    equired: true,
    validate: [(val) => validator.idExist("Gestor", val)],
  },
});
module.exports = mongoose.model(
  "Gastoslegales",
  gastosLegalesSchema,
  "gastoslegales"
);
