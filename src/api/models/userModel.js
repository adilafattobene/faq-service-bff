const dbConnection = require("../../config/dbServer");
const { v4 } = require("uuid");

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

const getUser = async function (userId) {
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
exports.getUser;

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

exports.createUser = async function (user) {
  let connection = dbConnection();

  connection.connect(function (err) {
    if (err) {
      throw err;
    }
    console.log("Conectado");
  });

  try {
    let sqlCompany =
      "insert into company(id, name) values ($1, $2) RETURNING *";
    let sqlValuesCompany = [v4(), user.companyName];

    const company = await connection.query(sqlCompany, sqlValuesCompany);

    let sqlAccount =
      "insert into account(id, name, company_id) values ($1, $2, $3) RETURNING *";
    let sqlValuesAccount = [v4(), user.name, company.rows[0].id];

    const account = await connection.query(sqlAccount, sqlValuesAccount);

    let sqlLogin =
      "insert into login(id, user_name, password, account_id, profile_id) values ($1, $2, $3, $4, $5) RETURNING *";
    let sqlValuesLogin = [
      v4(),
      user.name,
      user.password,
      account.rows[0].id,
      "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
    ];

    const login = await connection.query(sqlLogin, sqlValuesLogin);

    connection.end();

    return {
      id: account.rows[0].id,
      name: account.rows[0].name,
      login: login.rows[0],
      company: company.rows[0],
    };
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

exports.createUserChild = async function (userId, user) {
  let connection = dbConnection();

  connection.connect(function (err) {
    if (err) {
      throw err;
    }
    console.log("Conectado");
  });

  try {
    let ownerUser = await getUser(userId);

    let sqlAccount =
      "insert into account(id, name, company_id, owner_id) values ($1, $2, $3, $4) RETURNING *";
    let sqlValuesAccount = [
      v4(),
      user.name,
      ownerUser.company_id,
      ownerUser.id,
    ];

    const account = await connection.query(sqlAccount, sqlValuesAccount);

    let sqlLogin =
      "insert into login(id, user_name, password, account_id, profile_id) values ($1, $2, $3, $4, $5) RETURNING *";
    let sqlValuesLogin = [
      v4(),
      user.name,
      user.password,
      account.rows[0].id,
      "b2e2e9a8-0497-466d-9c32-787f11989431",
    ];

    const login = await connection.query(sqlLogin, sqlValuesLogin);

    connection.end();

    return {
      id: account.rows[0].id,
      name: account.rows[0].name,
      login: login.rows[0],
    };
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

exports.getProfiles = async () => {
  let connection = dbConnection();

  connection.connect(function (err) {
    if (err) {
      throw err;
    }
    console.log("Conectado");
  });

  try {
    let sql = "select * from profile";

    const profiles = await connection.query(sql);

    connection.end();

    return profiles.rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};