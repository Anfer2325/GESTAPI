const express = require("express");

const router = express.Router();
const isAuthenticated = require("../../middleware/isAuthenticated");

//get a list of account of an specific bufete from db
router.get("/cuentas", isAuthenticated, (req, res) => {
  console.log(req.gestor);

  console.log("test " + test);
  res.send({ type: "GET" });
});

//Add new cuenta to the db
router.post("/cuentas", isAuthenticated, (req, res) => {
  res.send({ type: "POST" });
});

//update a cuenta in the db
router.put("/cuentas/:id", isAuthenticated, (req, res) => {
  res.send({ type: "PUT" });
});

//Delete a cuenta from the db
router.delete("/cuentas/:id", isAuthenticated, (req, res) => {
  res.send({ type: "DELETE" });
});
module.exports = router;
