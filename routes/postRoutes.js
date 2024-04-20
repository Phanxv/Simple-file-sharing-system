const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/upload");
const { jwtAuth } = require("../middleware/jwtAuth");
const User = require("../models/User")

const {
  createPost,
  fetchData,
  wipeDatabase,
  serveFile,
} = require("../controllers/postController");

router.post("/post", upload.single("attachment"), createPost);
router.delete("/database", wipeDatabase); //for deveopment purpose only
router.get("/database/:data", fetchData);
router.get("/storage/:fileId", jwtAuth, serveFile);

router.get("/users", jwtAuth, async (req, res) => {
  const users = await User.find().lean().exec();
  res.render("users", { users });
});

module.exports = router;
