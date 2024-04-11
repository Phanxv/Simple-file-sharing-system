const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const User = require("../models/User")

async function signInUser(req, res) {
  const query = User.where({ username: req.body.username });
  const user = await query.findOne();
  if (user === null) {
    return res.redirect("/login/100");
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
      res.cookie("token", token, { httpOnly: true });
      res.cookie("username", user.username, { httpOnly: true });
      user.isLoggedin = true;
      user.lastLoggedin = Date.now();
      await user.save();
      return res.redirect("/");
    } else {
      return res.redirect("/login/100");
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
          return res.redirect("/login");
        })
        .catch((e) => {
          console.log(e);
          return res.redirect("/register/101");
        });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = {
    signInUser,
    signOutUser,
    createUser
};
