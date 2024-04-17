const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.jwtAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const username = req.cookies.username;
    jwt.verify(token, process.env.PRIVATE_KEY);
    const query = User.where({ username: username });
    const user = await query.findOne();

    if (await bcrypt.compare(token, user.jwtToken)) {
      next();
    } else {
        console.log("Token mismatched")
        throw "Token mismatched"
    }
  } catch (err) {
    console.log("Incoming unauthorized request");
    return res.redirect("/login");
  }
};
