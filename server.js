const express = require("express");
const dotenv = require('dotenv').config();
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const Post = require("./models/Post.js")

const app = express();

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

require('./initDB.js')();

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/upload", (req, res) => {
  res.render("upload");
});

const attachmentStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./storage");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: attachmentStorage });

app.post("/createPost", upload.single("attachment") , async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const postData = {
    postName: req.body.postName,
    postDesp: req.body.postDesp,
    path: req.file.path,
    originalName: req.file.originalname
  }
  
  const post = await Post.create(postData)
  
  console.log(post)
  
  res.send("posted")
});

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
