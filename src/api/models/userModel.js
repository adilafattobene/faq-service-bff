const dbConnection = require("../../config/dbServer");

exports.getUserProfile = async function (userId) {
  let connection = dbConnection();

  connection.connect(function (err) {
    if (err) {
      throw err;
    }
    console.log("Conectado");
  });

  let sql = "select * from login where account_id=$1";

  const a = await connection.query(sql, [userId]);

  connection.end();

  return a.rows[0];
};

exports.getUser = async function (userId) {
  let connection = dbConnection();

  connection.connect(function (err) {
    if (err) {
      throw err;
    }
    console.log("Conectado");
  });

  let sql = "select * from account where id=$1";

  const a = await connection.query(sql, [userId]);

  connection.end();

  return a.rows[0];
};

exports.getUsersById = async function (userId) {
  let connection = dbConnection();

  connection.connect(function (err) {
    if (err) {
      throw err;
    }
    console.log("Conectado");
  });

  let sql = "select * from account where owner_id=$1";

  const a = await connection.query(sql, [userId]);

  connection.end();

  return a.rows;
};
