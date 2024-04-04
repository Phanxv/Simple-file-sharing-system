const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const Post = require("./models/Post.js");
const fs = require("fs").promises;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./initDB.js")();

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const posts = await Post.find().lean().exec();
  res.render("home", { posts });
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

async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log(`File ${filePath} has been deleted.`);
  } catch (err) {
    console.error(err);
  }
}

app.post("/wipeDatabase", async (req, res) => {
  const posts = await Post.find();
  posts.forEach((element) => {
    deleteFile(element.path);
  });
  Post.deleteMany()
    .then(function () {
      // Success
      console.log("Database deleted");
    })
    .catch(function (error) {
      // Failure
      console.log(error);
    });
  res.send("Database wiped")
});

app.post("/createPost", upload.single("attachment"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const postData = {
    postName: req.body.postName,
    postDesp: req.body.postDesp,
    path: req.file.path,
    originalName: req.file.originalname,
  };

  const post = await Post.create(postData);

  console.log(post);

  res.send("posted");
});

app.get("/fetchPosts", async (req, res) => {
  const post = await Post.find().lean().exec();
  res.send(post);
});

app.get('/storage/:fileId', (req, res) => {
  console.log("requested file : " + req.params.fileId);
  res.sendFile(path.join(__dirname, "./storage/" + req.params.fileId));
})

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
