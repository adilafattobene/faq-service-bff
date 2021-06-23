const bcrypt = require("bcrypt");

exports.hashingPassword = function (psw, next) {
  bcrypt.hash(psw, parseInt(process.env.BCRIPT_SALTS)).then(function (hash) {
    if (!hash) {
      next();
    }
    next(hash);
  });
};

exports.hashingPasswordAsync = function (psw) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(psw, parseInt(process.env.BCRIPT_SALTS), function (err, hash) {
      if (err) {
        reject(err);
        return;
      }
      
      resolve(hash);
    });
  });
};

exports.comparePassword = function (pswReceived, pswSaved) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(pswReceived, pswSaved, function (err, result) {
      if (err) {
        reject(err);
        return;
      }

      resolve(result);
    });
  });
};
