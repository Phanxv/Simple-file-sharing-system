const jwt = require('jsonwebtoken')

exports.jwtAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        jwt.verify(token, process.env.PRIVATE_KEY);
        next();
    }
    catch (err){
        console.log("Incoming unauthorized request");
        return res.redirect("/login");
    }
}