const Post = require("../models/Post");
const User = require("../models/User");
const fs = require("fs").promises;
const path = require("path");

async function createPost(req, res) {
  console.log(req.body.title);
  console.log(req.body.author);
  try {
    const postData = {
      postName: req.body.title,
      postAuthor: req.body.author,
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
    return res.sendStatus(400);
  } finally {
    return res.sendStatus(200);
  }
}

async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
    console.log(`File ${filePath} has been deleted.`);
  } catch (err) {
    console.error(err);
  }
}

async function deletePost(req, res) {
  const id = req.params.id;
  const username = req.cookies.username;
  if (username)
    try {
      const post = await Post.findById(id);
      if (username === post.postAuthor) {
        await deleteFile(post.path);
        await Post.findByIdAndDelete(id);
        res.sendStatus(200);
      } else {
        res.status(401).send({ message : "Only post author can delete post."});
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Error deleting post");
    }
}

async function wipeDatabase(req, res) {
  const posts = await Post.find();
  posts.forEach((element) => {
    deleteFile(element.path);
  });
  Post.deleteMany()
    .then(() => {
      console.log("Posts database deleted");
    })
    .catch((e) => {
      console.log(e);
    });
  User.deleteMany()
    .then(() => {
      console.log("User database deleted");
    })
    .catch((e) => {
      console.log(e);
    });
  res.send("Database wiped");
}

async function fetchData(req, res) {
  if (req.params.data === "posts") {
    const post = await Post.find().lean().exec();
    res.json(post);
  } else if (req.params.data === "users") {
    const user = await User.find().lean().exec();
    res.json(user);
  } else {
    res.sendStatus(404);
  }
}

async function serveFile(req, res) {
  console.log("requested file : " + req.params.fileId);
  try {
    const query = Post.where({ path: "storage/" + req.params.fileId });
    const post = await query.findOne();
    res.download(
      path.join(process.env.UPLOAD_PATH, req.params.fileId),
      post.originalName
    );
    post.downloadCnt++;
    await post.save();
    console.log("Download count updated and file served");
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  createPost,
  deletePost,
  wipeDatabase,
  fetchData,
  serveFile,
};
