const mongoose = require("mongoose");
const validator = require("../validations/validator");
const clienteSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  email: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    required: [true, "El nombre es un campo obligatorios"],
    trim: true,
    uppercase: true,
  },
  socialId: {
    type: String,
    required: [true, "La identidad es un campo obligatorio"],
    trim: true,
    maxlength: 13,
    validate: [
      validator.onlyNumbers,
      "La identidad debe contener solo numero, y no debe contener espacios",
    ],
    unique: [true, "La identidad ya existe"],
  },
  phone: {
    type: String,
    validate: [
      validator.onlyNumbers,
      "El numero debe contener solo numeros y sin espacios",
    ],
    trim: true,
  },
  empresa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Empresa",
    default: "DesempleadoID",
    validate: [
      (val) => validator.idExist("Empresa", val),
      "La empresa tiene que existir en la base de datos",
    ],
    required: true,
  },
  domicilio: {
    type: String,
    trim: true,
  },
  accountNumber: {
    type: Number,
    default: 0,
  },
  accounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cuenta",
      validate: [
        (val) => validator.idExist("Cuenta", val),
        "La cuenta debe existir en la base de datos",
      ],
    },
  ],
  idCliente: {
    type: String,
    trim: true,
    validate: [
      validator.onlyNumbers,
      "El id del cliente solo debe contener numeros, sin espacios",
    ],
    unique: true,
    required: true,
  },
  otros: { type: String, trim: true },
});

module.exports = mongoose.model("Cliente", clienteSchema, "clientes");

// bufete: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "Bufete",
//   required: [true, "El bufete es obligatorio"],
// },
// gestor: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "Gestor",
//   required: [true, "El gestor es obligatorio"],
// },
