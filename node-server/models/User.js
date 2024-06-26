const mongoose = require("mongoose")

const User = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isLoggedin: {
        type: Boolean,
        required: true,
        default: false
    },
    lastLoggedin:{
        type: Date,
        default: Date.now
    },
    jwtToken:{
        type: String
    }
})

module.exports = mongoose.model("User", User);