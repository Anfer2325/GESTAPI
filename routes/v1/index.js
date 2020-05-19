const express = require("express");
const router = express.Router();
const cuentas = require("./cuentas");
const auth = require("./auth");
const bufetes = require("./bufetes");
router.use(cuentas);
router.use(auth);
router.use(bufetes);
module.exports = router;
