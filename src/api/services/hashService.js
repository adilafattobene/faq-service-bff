const bcrypt = require("bcrypt");

exports.hashingPassword = function (psw, next) {
    console.log("aqui")
    const saltRounds = 10;

    bcrypt.hash(psw, saltRounds).then(function (hash) {
        if (!hash) {
        next();
        }
        next(hash);
    });
};