const jwt = require('jsonwebtoken')

exports.jwtAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(token)
        jwt.verify(token, process.env.PRIVATE_KEY);
        next();
    }
    catch (err){
        console.log(err);
        return res.redirect("/login");
    }
}