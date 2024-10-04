const jwt = require("jsonwebtoken");
const JWT_SECRET = "s3cret";

function auth(req, res, next) {
    const token = req.headers.authorization;

    try {
        const response = jwt.verify(token, JWT_SECRET);
        if (response) {
            req.userId = response.id;
            next();
        } else {
            res.status(403).json({
                message: "Incorrect creds"
            })
        }
    } catch (error) {
        res.status(401).json({
            message: `Invalid token`,
            error: error
        })
    }
}

module.exports = {
    auth,
    JWT_SECRET
}
