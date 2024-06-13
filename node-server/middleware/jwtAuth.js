const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.jwtAuth = async (req, res, next) => {
  try {
    const token = req.query.token;
    jwt.verify(token, process.env.PRIVATE_KEY, (err) => {
      if (err) {
        console.log(err)
        return res.status(401).json({ message: String(err) });
      } else {
        next();
      }
    });
  } catch (err) {
    console.log("Incoming unauthorized request");
    return res.status(401).json({ message: "Unauthorized" });
  }
};
