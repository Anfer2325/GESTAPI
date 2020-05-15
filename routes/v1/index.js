const express = require("express");
const router = express.Router();
const cuentas = require("./cuentas");
const auth = require("./auth");
router.use(cuentas);
router.use(auth);
module.exports = router;
