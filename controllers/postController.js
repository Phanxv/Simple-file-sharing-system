const Post = require("../models/Post");
const User = require("../models/User");
const fs = require("fs").promises;
const path = require("path");

async function createPost(req, res) {
  console.log(req.body);
  console.log(req.file);
  console.log(req.cookies.username);
  try {
    const postData = {
      postName: req.body.postName,
      postDesp: req.body.postDesp,
      path: req.file.path,
      originalName: req.file.originalname,
      postAuthor: req.cookies.username,
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
    return res.redirect("/upload");
  } finally {
    return res.redirect("/");
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
  try {
    const post = await Post.findByIdAndDelete(id);
    await deleteFile(post.path);
    res.sendStatus(200);
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
    res.send(post);
  } else if (req.params.data === "users") {
    const post = await User.find().lean().exec();
    res.send(post);
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
