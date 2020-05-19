const express = require("express");
const router = express.Router();
const isAuthenticated = require("../../middleware/isAuthenticated");
const Bufete = require("../../models/bufete");
const mongoose = require("mongoose");
//get a list of bufetes of an specific bufete from db
router.get("/bufetes", isAuthenticated, (req, res) => {
  Bufete.findById("5ebf0aa3d1c67f06a498ae25", (err, result) => {
    try {
      console.log(result);
      if (result.length > 0) {
        res.send(result);
      }
      res.send(error);
    } catch (error) {
      res.send(error);
    }
  });
});

//Add new bufete to the db
router.post("/bufetes", isAuthenticated, (req, res) => {
  try {
    var body = req.body;
    //create the bufete object
    var bufete = new Bufete({
      _id: new mongoose.Types.ObjectId(),
      name: body.name,
      address: body.address,
      phone: body.phone,
    });
    //save bufete in db
    bufete
      .save()
      .then(() => {
        console.log("desde save");
        res.statusCode = 201;
        res.send("Bufete creado con exito");
      })
      .catch((err) => {
        res.statusCode = 409;
        res.send(err);
      });
  } catch (error) {
    res.statusCode = 409;
    res.send(error);
  }
});
module.exports = router;
