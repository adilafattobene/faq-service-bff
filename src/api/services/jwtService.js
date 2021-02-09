const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.createJwtToken = (payload) => {
    const token =  jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });

    return token;
}

exports.verifyToken = ( token, next ) => {
    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) throw err;
        next(decoded);
    });
}