const express = require("express");
const dotenv = require('dotenv').config();

const app = express();

require('./initDB.js')();

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
