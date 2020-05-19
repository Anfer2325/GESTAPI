const mongoose = require("mongoose");
const validator = require("../validations/validator");
const demandaSchema = mongoose.Schema({
  //agregar
  //gasto legal por presentacion de demanda
  //520 lps

  _id: { type: mongoose.Schema.Types.ObjectId },
  gestor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gestor",
    validate: [
      (val) => validator.idExist("Gestor", val),
      "El gestor debe existir",
    ],
  },
  tipoDemanda: {
    type: String,
    required: true,
    trim: true,
    enum: ["TITULO EXTRAJUDICIAL"],
    uppercase: true,
  },
  fechaPresentacion: {
    type: Date,
    required: true,
  },
  //validar formato del expediente
  expediente: {
    type: String,
    required: true,
    trim: true,
  },
  juez: {
    type: Number,
    required: true,
  },
  escribiente: {
    type: Number,
    required: true,
  },
  valorDemanda: {
    type: Number,
    required: true,
  },
  gastosLegales: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GastoLegal",
    required: true,
  },
  juzgado: {
    type: String,
    required: true,
    enum: ["LETRAS", "PAZ"],
  },
  ciudad: {
    type: String,
    required: true,
    trim: true,
  },
});
module.exports = mongoose.model("Demanda", demandaSchema, "demandas");
