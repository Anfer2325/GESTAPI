const mongoose = require("mongoose");
const bufeteSchema = require("./bufete");
const validator = require("../validations/validator");
const gestorSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  email: {
    type: String,
    required: [true, "El email es un campo obligatorio"],
    trim: true,
  },
  name: {
    type: String,
    required: [true, "El nombre es un campo obligatorios"],
    trim: true,
  },
  password: { type: String, required: true, trim: true },
  username: { type: String, unique: true, trim: true },
  bufete: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bufete",
    required: true,
    validate: [
      (val) => validator.idExist("Bufete", val),
      "El bufete debe exister",
    ],
  },
  type: {
    type: String,
    required: true,
    enum: ["ADMINISTRADOR", "GESTOR", "ROOT"],
    uppercase: true,
    trim: true,
  },
  dailyGestiones: {
    type: Number,
    default: 0,
  },
  dailyRecuperacion: {
    type: Number,
    default: 0.0,
  },
  accountsNumber: {
    type: Number,
    default: 0,
  },
  accounts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cuenta",
      validate: [
        (val) => validator.idExist("Cuenta", val),
        "La cuenta debe existir",
      ],
    },
  ],
});

gestorSchema.post("save", function (doc) {
  bufeteSchema
    .findByIdAndUpdate(doc.bufete, {
      $push: { gestores: doc._id },
      $inc: { numeroGestores: 1 },
    })
    .then((result) => {});
});

gestorSchema.pre("remove", function (next) {
  bufeteSchema.findByIdAndUpdate(
    this.bufete,
    {
      $inc: { numeroGestores: -1 },
      $pull: { gestores: this._id },
    },

    next
  );
});
// bufete: { type: mongoose.Schema.ObjectId, ref: "Bufete", required: true },

module.exports = mongoose.model("Gestor", gestorSchema, "gestores");
