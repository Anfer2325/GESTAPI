const mongoose = require("mongoose");

exports.onlyNumbers = function (value) {
  var isnum = /^\d+$/;
  return isnum.test(value);
};

exports.idExist = async (modelName, value) => {
  var model = mongoose.model(modelName);
  var result = await model.findById(value);

  if (result === null) {
    return false;
  }
  return true;
};

exports.esDemandaObligatoria = async (idCaracterizacion) => {
  var model = mongoose.model("Caracterizacionjudical");
  var result = await model.findById(idCaracterizacion);
  if (result === null) {
    return false;
  } else {
    if (result.nombre === "RASTREO") {
      return false;
    }
    return true;
  }
};

exports.esCaracterizacionjudicialObligatoria = async (estado) => {
  var model = mongoose.model("Caracterizacionjudical");

  if (estado === "Extrajudicial") {
    return false;
  } else {
    return true;
  }
};

exports.fecha1mayorfecha2 = (f1, f2) => {
  if (+f1 >= +f2) {
    true;
  } else {
    false;
  }
};
