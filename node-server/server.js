const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const os = require('os');
const path = require('path');
const cors = require('cors');

const authRoutes = require("./routes/authRoutes")
const postRoutes = require("./routes/postRoutes")

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: 'http://localhost:4000' }));

app.set("view engine", "ejs");

require('./utils/initDB')();

app.use('/', authRoutes);
app.use('/', postRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});