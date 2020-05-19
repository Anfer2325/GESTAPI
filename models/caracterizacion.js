const mongoose = require("mongoose");
const validator = require("../validations/validator");
const caracterizacionSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String, trim: true, required: true },
  code: { type: String, trim: true, required: true },
});
module.exports = mongoose.model(
  "Caracterizacion",
  caracterizacionSchema,
  "caracterizaciones"
);
