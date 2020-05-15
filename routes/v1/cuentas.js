const express = require("express");
const router = express.Router();

//get a list of account of an specific bufete from db
router.get("/cuentas", (req, res) => {
  res.send({ type: "GET" });
});

//Add new cuenta to the db
router.post("/cuentas", (req, res) => {
  res.send({ type: "POST" });
});

//update a cuenta in the db
router.put("/cuentas/:id", (req, res) => {
  res.send({ type: "PUT" });
});

//Delete a cuenta from the db
router.delete("/cuentas/:id", (req, res) => {
  res.send({ type: "DELETE" });
});
module.exports = router;
