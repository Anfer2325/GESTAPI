const jwt = require("jsonwebtoken");
module.exports = function isAuthenticated(req, res, next) {
  // grab authentication token from req header
  var token = req.cookies.jwt;

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (decoded) {
      req.gestor = decoded;
      next();
    } else {
      res.statusCode = 401;
      res.send("No tiene permisos para realizar esta accion");
    }
  });
};
