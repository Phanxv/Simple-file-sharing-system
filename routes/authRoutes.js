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
  let err_code = 200;
  res.render("register", { err_code });
});

router.get("/register/:err", (req, res) => {
  let err_code = req.params.err;
  console.log(err_code);
  res.render("register", { err_code });
});

router.get("/login", (req, res) => {
  let err_code = 200;
  res.render("login", { err_code });
});

router.get("/login/:err", (req, res) => {
  let err_code = req.params.err;
  console.log(err_code);
  res.render("login", { err_code });
});

router.get("/test", (req, res) => {
  console.log(req.query.msg);
  res.sendStatus(200);
});

router.post("/signin", signInUser);
router.get("/signout", signOutUser);
router.post("/user", createUser);

module.exports = router;