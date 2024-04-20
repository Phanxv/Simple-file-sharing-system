const express = require("express");
const router = express.Router();
const { jwtAuth } = require("../middleware/jwtAuth")
const { signInUser, signOutUser, createUser } = require("../controllers/authController")
const Post = require("../models/Post")

router.get("/", jwtAuth, async (req, res) => {
  const posts = await Post.find().lean().exec();
  res.render("home", { posts });
});

router.get("/upload", jwtAuth, (req, res) => {
  const username = req.cookies.username;
  res.render("upload", { username });
});

router.get("/register", (req, res) => {
  let msg = req.query.msg;
  res.render("register", { message : msg });
});

router.get("/login", (req, res) => {
  let msg = req.query.msg;
  res.render("login", { message : msg });
});


router.post("/signin", signInUser);
router.get("/signout", jwtAuth,signOutUser);
router.post("/user", createUser);

module.exports = router;