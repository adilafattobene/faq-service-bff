const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.createJwtToken = (payload) => {
    const token =  jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });

    return token;
}