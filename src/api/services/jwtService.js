const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createJwtToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });

  return token;
};

exports.verifyToken = (token, next) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        reject(err);
        return;
      }
    
      resolve(decoded);
    });
  });
};
