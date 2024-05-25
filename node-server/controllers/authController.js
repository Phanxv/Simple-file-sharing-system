const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function signInUser(req, res) {
  const query = User.where({ username: req.body.username });
  const user = await query.findOne();
  if (user === null) {
    return res.status(400).json({ message: "Incorrect username or password" });
  } else {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign(
        {
          username: user.username,
        },
        process.env.PRIVATE_KEY,
        { expiresIn: "1h" }
      );
      console.log(`User ${user.username} logged in with token : ${token}`);
      user.isLoggedin = true;
      user.jwtToken = await bcrypt.hash(token, 10);
      user.lastLoggedin = Date.now();
      await user.save();
      return res.status(200).json({ message: "Log in successful!", token: token });
    } else {
      return res
        .status(400)
        .json({ message: "Incorrect username or password" });
    }
  }
}

async function signOutUser(req, res) {
  const query = User.where({ username: req.cookies.username });
  const user = await query.findOne();
  user.isLoggedin = false;
  await user.save();
  res.clearCookie("token");
  res.clearCookie("username");
  res.redirect("/");
}

async function createUser(req, res) {
  userData = { username : "" , password : "" };
  userData.username = req.body.username;
  const query = User.where({ username: req.body.username });
  const user = await query.findOne();
  if (user === null) {
    userData.password = await bcrypt.hash(req.body.password, 10);
    console.log(userData);
    await User.create(userData)
      .then(() => {
        return res.status(200).json({ message: "Register successful!" });
      })
      .catch((e) => {
        console.log(e);
        return res.status(500).json({ message: "Internal server error" });
      });
  } else {
    return res.status(400).json({ message : "Username taken" })
  }
}

module.exports = {
  signInUser,
  signOutUser,
  createUser,
};
