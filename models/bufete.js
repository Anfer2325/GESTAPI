const mongoose = require("mongoose");
const validator = require("../validations/validator");
const bufeteSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },

  name: {
    type: String,
    required: [true, "El nombre es un campo obligatorios"],
    trim: true,
    uppercase: true,
    unique: true,
  },

  address: {
    type: String,
    required: [true, "La direccion es un campo obligatorio"],
    trim: true,
  },

  phone: {
    type: String,
    required: [true, "El telefono del bufete es obligatorio"],
    trim: true,
    validate: [
      validator.onlyNumbers,
      "El telefono debe contener solo numeros, y no debe contener espacios",
    ],
  },
  numeroCuentas: {
    type: Number,
    default: 0,
  },
  numeroGestores: {
    type: Number,
    default: 0,
  },
  gestores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gestor",
      validate: [
        (val) => validator.idExist("Gestor", val),
        "El id del gestor debe existir",
      ],
    },
  ],
});

// bufeteSchema.pre("save", function (next) {
//   var origDocument = JSON.stringify(this.toJSON()); //get references of the object value
//   console.log(origDocument);
//   console.log("from pre");
//   next();
// });

module.exports = mongoose.model("Bufete", bufeteSchema, "bufetes");
