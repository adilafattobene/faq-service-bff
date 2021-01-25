const bcrypt = require("bcrypt");

exports.hashingPassword = function (psw, next) {
    //TODO retirar a quantidade de saltos e armazenar em um env
    const saltRounds = 10; 

    bcrypt.hash(psw, saltRounds).then(function (hash) {
        if (!hash) {
        next();
        }
        next(hash);
    });
};



