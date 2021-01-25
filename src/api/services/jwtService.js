const jwt = require("jsonwebtoken");

exports.createJwtToken = (payload) => {
    const token =  jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });

    return token;
}