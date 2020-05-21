const express = require("express");
const router = express.Router();
const Gestor = require("../../models/gestor");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("../../validations/validator");
//logins a user
router.post("/login", (req, res) => {
  console.log("test");
  // console.log(req.headers.cookie);
  var body = req.body;
  //look for the username and password in the db
  Gestor.find({ username: body.username, password: body.password })
    .populate("bufete")
    .then((result) => {
      //checks if there are any results
      if (result.length === 0) {
        res.statusCode = 400;
        res.send("no se encontro ningun usuario con ese nombre");
      } else {
        //if results are found
        var gestor = result[0];
        //create jwt

        var jsonwebtoken = jwt.sign(result[0].toJSON(), process.env.SECRET);
        // res.header("Set-Cookie", `jwt=${jsonwebtoken};Secure;SameSite=None`);
        // setting cookie
        res.cookie("jwt", jsonwebtoken, {
          httpOnly: true,
          secure: false, //true para que aparezca en los cookies del navegador (atraves de conexion segura ssl), false no aparece en navegador pero si en req
          sameSite: "none",
        });
        res.statusCode = 200;

        //sending response
        res.json({
          email: gestor.email,
          name: gestor.name,
          username: gestor.username,
          bufete: gestor.bufete,
          type: gestor.type,
          _id: gestor._id,
        });
        // res.send("usuario encontrado");
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
    bufete: body.bufete,
    type: body.type,
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

router.get("/login/verify", (req, res) => {
  //get the jwt in the cookie
  var token = req.cookies.jwt;

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (decoded) {
      res.statusCode = 200;
      res.send(true);
    } else {
      res.statusCode = 401;
      res.send(err);
    }
  });
});
module.exports = router;
