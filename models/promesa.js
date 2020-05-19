const mongoose = require("mongoose");
const validator = require("../validations/validator");
const promesaSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  monto: { type: Number, required: true },
  fechaInicio: {
    type: Date,
    required: true,
    validate: [
      (val) => validator.fecha1mayorfecha2(this.fechaCobro, val),
      "La fecha de inicio no puede ser menor a la fecha de cobro",
    ],
  },
  fechaCobro: { type: Date, required: true },
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
  jefatura: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  status: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  canal: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
  },
  tipo: {
    type: String,
    required: true,
    trim: true,
    uppercase: true,
    enum: ["AGP", "ABONO", "DEBITO", "EMBARGO"],
  },
});

module.exports = mongoose.model("Promesa", promesaSchema, "promesas");
