const express = require("express");
const router = express.Router();
const Gestor = require("../../models/gestor");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//logins a user
router.post("/login", (req, res) => {
  var body = req.body;
  //look for the username and password in the db
  Gestor.find({ username: body.username, password: body.password })
    .then((result) => {
      //checks if there are any results
      if (result.length === 0) {
        res.send("no se encontro ningun usuario con ese nombre");
      } else {
        //if results are found

        //create jwt
        var jsonwebtoken = jwt.sign(result[0].toJSON(), process.env.SECRET);
        //setting cookie
        res.cookie("jwt", jsonwebtoken);
        //sending response

        res.send("usuario encontrado");
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

//create a new gestor in the db
router.post("/signIn", (req, res) => {
  var body = req.body;

  //create the gestor object
  var gestor = new Gestor({
    _id: new mongoose.Types.ObjectId(),
    email: body.email,
    name: body.name,
    password: body.password,
    username: body.username,
  });

  //saves the gestor in the db
  gestor
    .save()
    .then(() => {
      res.statusCode = 201;
      res.send("Creado con exito");
    })
    .catch((err) => {
      res.statusCode = 409;
      res.send(err);
    });
});
module.exports = router;
