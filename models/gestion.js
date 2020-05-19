const mongoose = require("mongoose");
const validator = require("../validations/validator");
const gestionSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  gestion: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  date: {
    type: Date,
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
  caracterizacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Caracterizacion",
    required: true,
    validate: [
      (val) => validator.idExist("Caracterizacion", val),
      "La caracterizacion debe existir",
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
    required: true,
    validate: [(val) => validator.idExist("Gestor", val)],
  },
  caracterizacionGestion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Caracterizaciongestion",
    required: true,
    validate: [(val) => validator.idExist("Caracterizaciongestion", val)],
  },
  subcaracterizacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcaracterizacion",
    validate: [
      (val) => validator.idExist("Subcaracterizacion", val),
      "La subcaracterizacion debe existir",
    ],
  },
  promesa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Promesa",
    validate: [(val) => validator.idExist("Promesa", val)],
  },
});
