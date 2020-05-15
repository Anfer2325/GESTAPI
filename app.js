const express = require("express");
const cookieParser = require("cookie-parser");
const routes = require("./routes/api");

require("dotenv").config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

const mongoose = require("mongoose");

mongoose.connect(process.env.CONNECTION_STRING, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useNewUrlParser: true,
});

app.listen("5000", () => {
  console.log("server running ");
});
