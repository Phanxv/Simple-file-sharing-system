const mongoose = require("mongoose")

const Post = new mongoose.Schema({
    postName: {
        type: String,
        required: true
    },
    postDesp: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now
    },
    path: {
        type: String,
        required: true,
        unique: true
    },
    originalName: {
        type: String,
        required: true
    },
    downloadCnt: {
        type: Number,
        required: true,
        default: 0
    },
    postAuthor: {
        type: String,
        required: true,
        default: "anon"
    }
})

module.exports = mongoose.model("Post", Post)