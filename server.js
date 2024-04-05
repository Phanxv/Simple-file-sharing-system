const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const path = require("path");
const Post = require("./models/Post.js");
const User = require('./models/User.js');
const fs = require("fs").promises;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./initDB.js')();

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.get('/', async (req, res) => {
  const posts = await Post.find().lean().exec();
  res.render('home', { posts });
});

app.get('/upload', (req, res) => {
  res.render('upload');
});

app.get('/register', (req, res) => {
  let err_code = 200;
  res.render('register', { err_code });
});

app.get('/register/:err', (req, res) => {
  let err_code = req.params.err;
  console.log(err_code)
  res.render('register', { err_code });
});

app.post("/createUser", async (req, res) => {
  console.log(req.body);
  if (req.body.password !== req.body.re_password) {
    return res.redirect("/register/609");
  }
  try {
    const userData = {
      username: req.body.username,
    };
    userData.password = await bcrypt.hash(req.body.password, 10);
    console.log(userData);
    await User.create(userData)
      .then(() => {
        console.log("User Created");
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (e) {
    console.log(e);
  } finally {
    res.send("OK");
  }
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
        "_" +
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

app.post('/wipeDatabase', async (req, res) => {
  const posts = await Post.find();
  posts.forEach((element) => {
    deleteFile(element.path);
  });
  Post.deleteMany()
    .then( () => {
      console.log("Database deleted");
    })
    .catch( (e) => {
      console.log(e);
    });
  res.send("Database wiped");
});

app.post('/createPost', upload.single("attachment"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  try {
    const postData = {
      postName: req.body.postName,
      postDesp: req.body.postDesp,
      path: req.file.path,
      originalName: req.file.originalname,
    };

    await Post.create(postData)
      .then(() => {
        console.log("Post Created");
      })
      .catch((e) => {
        console.log(e);
      });

  } catch (e) {
    console.log(e);
    return res.redirect("/upload");
  } finally {
    return res.redirect("/");
  }
});

app.get('/fetchPosts', async (req, res) => {
  const post = await Post.find().lean().exec();
  res.send(post);
});

app.get('/storage/:fileId', (req, res) => {
  console.log("requested file : " + req.params.fileId);
  try {
    res.sendFile(path.join(__dirname, './storage/' + req.params.fileId));
    console.log("file served");
  } catch (e) {
    console.log(e);
  }
});

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
