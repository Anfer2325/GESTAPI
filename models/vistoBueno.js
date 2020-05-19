const mongoose = require("mongoose");
const validator = require("../validations/validator");
const vistoBuenoSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  monto: {
    type: Number,
    required: true,
  },
  descuento: {
    type: Number,
    required: true,
  },
  fechaEnvio: {
    type: Date,
    required: true,
  },
  fechaPago: {
    type: Date,
    required: true,
  },
  gestor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gestor",
    required: true,
    validate: [
      (val) => validator.idExist("Gestor", val),
      "El gestor debe existir",
    ],
  },
  bufete: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bufete",
    required: true,
    validate: [
      (val) => validator.idExist("Bufete", val),
      "El bufete debe existir",
    ],
  },
});

module.exports = mongoose.model("VistoBueno", vistoBuenoSchema, "vistosBuenos");
