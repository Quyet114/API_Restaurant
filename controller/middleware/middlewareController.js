const jwt = require("jsonwebtoken");

const middlewareController = {
    verifyToken: (req, res, next) => {
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    res.status(403).json("Token is not valid");

                }
                req.user = user;
                next();
            })
        } else {
            res.status(401).json("you are not admin");
        }
    },
    verifyTokenAndAdmin: (req, res, next) => {
        verifyToken(req, res, () => {
            if (req.user.isAdmin) {
                next();
            } else {
                res.status(403).json("You're not allowed to do that!");
            }
        });
    }



}
module.exports = middlewareController;