const mongoose = require("mongoose");
const validator = require("../validations/validator");
const cuentaSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cliente",
    required: true,
    validate: [
      (val) => validator.idExist("Cliente", val),
      "El cliente debe existir",
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
  saldoLps: {
    type: Number,
    required: true,
  },
  saldoUsd: {
    type: Number,
    required: true,
  },
  vasa: {
    type: String,
    required: true,
    unique: true,
    validate: [
      validator.onlyNumbers,
      "El numero de vasa debe contener solo numero, y sin espacios",
    ],
    trim: true,
  },
  fechaAsignacion: {
    type: Date,
    default: Date.now,
  },
  promesa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Promesa",
    validate: [(val) => validator.idExist("Promesa", val)],
  },
  gestiones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gestion",
      validate: [
        (val) => validator.idExist("Gestion", val),
        "La gestion tiene que existir",
      ],
    },
  ],
  caracterizacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Caracterizacion",
    validate: [
      (val) => validator.idExist("Caracterizacion", val),
      "La caracterizacion debe existir",
    ],
  },
  subcaracterizacion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcaracterizacion",
    validate: [
      (val) => validator.idExist("Subcaracterizacion", val),
      "La subcaracterizacion debe existir",
    ],
  },

  //hacer required si el status es judicial
  //caracterizacion rastreo hasta que existe datos de demanda
  caracterizacionJudicial: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Caracterizacionjudicial",
    validate: [
      {
        validator: (val) => validator.idExist("Caracterizacionjudicial", val),
        msg: "La caracterizacion judicial debe existir",
      },
      {
        validator: (val) =>
          validator.esCaracterizacionjudicialObligatoria(this.estado),
        msg:
          "La cuenta esta en estado extrajudicial no puede llevar caracterizacion judicial",
      },
    ],
    required: (val) => {
      validator.esCaracterizacionjudicialObligatoria(this.estado);
    },
  },
  //hacer required si el status es judicial
  demanda: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Demanda",
    validate: [
      {
        validator: (val) => validator.idExist("Demanda", val),
        msg: "La demanda debe estar creada",
      },
      {
        validator: (val) =>
          validator.esDemandaObligatoria(this.caracterizacionJudicial),
        msg: "La caracterizacionJudicial no puede ser RASTREO",
      },
    ],
    required: (val) => {
      validator.esDemandaObligatoria(this.caracterizacionJudicial);
    },
  },

  vehiculo: {
    type: String,
    required: true,
    trim: true,
    enum: ["FT", "FCB", "PRESTAMO"],
  },

  estado: {
    type: String,
    required: true,
    trim: true,
    enum: ["Extrajudicial", "Judicial"],
  },

  fechaCastigo: {
    type: Date,
    required: true,
  },
  numeroTarjeta: {
    type: String,
    required: true,
    trim: true,
    validate: [
      validator.onlyNumbers,
      "El numeor de tarjeta debe contener solo numeros",
    ],
    ml: {
      type: String,
      required: true,
      trim: true,
      enum: ["600", "603"],
    },
  },

  //vistoi buneo
  vistoBueno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VistoBueno",
    validate: [
      (val) => validator.idExist("VistoBueno", val),
      "El visto bueno no existe",
    ],
  },

  //visto
  //fecha que se envio el visto buneo
  //descuento
  //montoPromesa
  //FechaPromesa
});

// function esDemandaObligatoria(){
//   if(this.caracterizacionJudicial)
// }

module.exports = mongoose.model("Cuenta", cuentaSchema, "cuentas");

// ExampleSchema.path("parentId").validate(function (value, respond) {
//   ExampleModel.findOne({ _id: value }, function (err, doc) {
//     if (err || !doc) {
//       respond(false);
//     } else {
//       respond(true);
//     }
//   });
// }, "Example non existent");
