const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const path = require("path");
const Post = require("./models/Post.js");
const User = require('./models/User.js');
const fs = require("fs").promises;
const jwt = require('jsonwebtoken')
const { jwtAuth } = require('./jwtAuth.js');
const cookieParser = require("cookie-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

require('./initDB.js')();

app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");

app.get('/', jwtAuth, async (req, res) => {
  const posts = await Post.find().lean().exec();
  res.render('home', { posts });
});

app.get('/upload', jwtAuth, (req, res) => {
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

app.get('/login', (req, res) => {
  let err_code = 200;
  res.render('login', { err_code });
});

app.get('/login/:err', (req, res) => {
  let err_code = req.params.err;
  console.log(err_code)
  res.render('login', { err_code });
});

app.post('/signin', async (req, res) => {
  console.log(req.body)
  const query = User.where({ username: req.body.username });
  const user = await query.findOne();
  if(user === null) {
    return res.redirect('/login/100');
  } else {
    if ( await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign(
        {
          username: user.username
        },
        process.env.PRIVATE_KEY,
        { expiresIn: "1h" }
      ); 
      console.log(token);
      res.cookie("token", token, { httpOnly: true });
      res.cookie("username", user.username, { httpOnly: true });
      return res.redirect('/');
    } else {
      return res.redirect('/login/100');
    }
  }
});

app.post("/createUser", async (req, res) => {
  console.log(req.body);
  if (req.body.password !== req.body.re_password) {
    return res.redirect("/register/100");
  } else {
    try {
      const userData = {
        username: req.body.username,
      };
      userData.password = await bcrypt.hash(req.body.password, 10);
      console.log(userData);
      await User.create(userData)
        .then(() => {
          console.log("User Created");
          return res.redirect('/login')
        })
        .catch((e) => {
          console.log(e);
          return res.redirect('/register/101')
        });
    } catch (e) {
      console.log(e);
    }
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
      console.log("Posts database deleted");
    })
    .catch( (e) => {
      console.log(e);
    });
  User.deleteMany()
    .then( () => {
      console.log("User database deleted");
    })
    .catch( (e) => {
      console.log(e);
    })
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

app.get('/fetch/:data', async (req, res) => {
  if(req.params.data === 'posts') {
    const post = await Post.find().lean().exec();
    res.send(post);
  } else if (req.params.data === 'users') {
    const post = await User.find().lean().exec();
    res.send(post);
  } else {
    res.sendStatus(404)
  }
});

app.get('/storage/:fileId', async (req, res) => {
  console.log("requested file : " + req.params.fileId);
  try {
    const query = Post.where({ path: 'storage/' +  req.params.fileId});
    const post = await query.findOne();
    res.download(post.path, post.originalName);
    post.downloadCnt++;
    await post.save();
    console.log("Download count updated and file served");
    console.log(post);
  } catch (e) {
    console.log(e);
  }
});

app.listen(3000, () => {
  console.log("Listening at port 3000");
});
