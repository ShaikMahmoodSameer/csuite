require('dotenv').config();
const jwt = require('jsonwebtoken');
const privateKey = process.env.TOKEN_SECRET_KEY;

const verifyAdmin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ TokenError: "not Authenticated, Login!" });
    } else {
        jwt.verify(token, privateKey, (err, decoded) => {
            if (err) { return res.json({ Error: "Bad Request!" });
            } else {
                req.adminId = decoded.sub;
                next();
            }
        });
    }
};

module.exports = { verifyAdmin };