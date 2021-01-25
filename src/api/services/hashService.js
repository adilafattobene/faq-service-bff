const bcrypt = require("bcrypt");

exports.hashingPassword = function (psw, next) {

    bcrypt.hash(psw, process.env.BCRIPT_SALTS)
            .then(function (hash) {
                if (!hash) {
                next();
                }
                next(hash);
            });
};



