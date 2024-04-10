const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/upload");
const { jwtAuth } = require("../middleware/jwtAuth")
const { createPost, fetchData, wipeDatabase, serveFile } = require("../controllers/postController");

router.post("/createPost", upload.single('attachment'), createPost);
router.post("/wipeDatabase", wipeDatabase);
router.get("/fetch/:data", fetchData);
router.get("/storage/:fileId", jwtAuth, serveFile);

module.exports = router;
