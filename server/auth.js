const jwt = require("jsonwebtoken")
const SECRET_KEY = "ukllaundry"
auth = (req, res, next) => {
    // let header = req.headers.authorization
    let token = req.headers["x-access-token"];

    // let jwtHeader = {
    //     algorithm: "HS256"
    // }
    if(token == null){
        res.status(401).json({ message: "Unauthorized"})
    }else{
        jwt.verify(token, SECRET_KEY, (error,user) => {
            if (error) {
                res
                .status(401)
                .json({
                    auth: false,
                    message: "Invalid token"
                })
            } else {
                console.log(user);
                req.userId = user.id;
                next()
            }
        })
    }
}

module.exports = auth
