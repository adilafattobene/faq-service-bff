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

  try {
    let sql =
      "select p.id, p.description " +
      "from login l " +
      "inner join profile p on p.id = l.profile_id " +
      "where account_id = $1";

    const a = await connection.query(sql, [userId]);

    connection.end();

    return a.rows[0];
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

exports.getUser = async function (userId) {
  let connection = dbConnection();

  connection.connect(function (err) {
    if (err) {
      throw err;
    }
    console.log("Conectado");
  });
  try {
    let sql =
      "select  a.id as userId, " +
      "a.name as name, " +
      "c.id as companyId, " +
      "c.name as companyName " +
      "from account a " +
      "inner join company c on c.id = a.company_id " +
      "where a.id = $1";

    const user = await connection.query(sql, [userId]);

    connection.end();

    return {
      id: user.rows[0].userid,
      name: user.rows[0].name,
      company: {
        id: user.rows[0].companyid,
        name: user.rows[0].companyname,
      },
    };

  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

exports.getUsersById = async function (userId) {
  let ownerUser = await this.getUser(userId);

  if (!ownerUser) {
    throw Error("not_found");
  }

  let connection = dbConnection();

  connection.connect(function (err) {
    if (err) {
      throw err;
    }
    console.log("Conectado");
  });

  try {
    let sql =
      "select a.id as id, " +
      "a.name as name, " +
      "l.user_name as userName, " +
      "p.description as profile " +
      "from account a " +
      "inner join login l on a.id = l.account_id " +
      "inner join profile p on p.id = l.profile_id " +
      "where a.owner_id =$1";

    const children = await connection.query(sql, [userId]);

    connection.end();

    return children.rows;
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
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
    let userDB = await this.getUserLoginByUserName(user.userName);

    if (userDB.userName === user.userName) {
      throw Error("conflict_error");
    }

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
      user.userName,
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
    let ownerUser = await this.getUser(userId);

    if (!ownerUser) {
      throw Error("not_found");
    }

    let userDB = await this.getUserLoginByUserName(user.userName);

    if (userDB) {
      throw Error("conflict_error");
    }

    let sqlAccount =
      "insert into account(id, name, company_id, owner_id) values ($1, $2, $3, $4) RETURNING *";
    let sqlValuesAccount = [
      v4(),
      user.name,
      ownerUser.company_id,
      ownerUser.id,
    ];

    const account = await connection.query(sqlAccount, sqlValuesAccount);

    if (account) {
      let sqlLogin =
        "insert into login(id, user_name, password, account_id, profile_id) values ($1, $2, $3, $4, $5) RETURNING *";
      let sqlValuesLogin = [
        v4(),
        user.userName,
        user.password,
        account.rows[0].id,
        "b2e2e9a8-0497-466d-9c32-787f11989431",
      ];

      const login = await connection.query(sqlLogin, sqlValuesLogin);

      connection.end();

      if (login) {
        return {
          id: account.rows[0].id,
          name: account.rows[0].name,
          login: login.rows[0],
        };
      }

      throw Error("create_login_error");
    } else {
      throw Error("create_user_error");
    }
  } catch (err) {
    if (err.message === "create_login_error") {
      // TODO
      //precisa deletar o usuario criado
    }

    throw err;
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

exports.getProfile = async (profileId) => {
  let connection = dbConnection();

  connection.connect(function (err) {
    if (err) {
      throw err;
    }
    console.log("Conectado");
  });

  try {
    let sql = "select * from profile where id=$1";

    const profile = await connection.query(sql, [profileId]);

    connection.end();

    return profile.rows[0];
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

exports.getUserLoginByUserName = async function (userName) {
  let connection = dbConnection();

  connection.connect(function (err) {
    if (err) {
      throw err;
    }
    console.log("Conectado");
  });

  try {
    let sql = "select * from login where user_name=$1";

    const userLogin = await connection.query(sql, [userName]);

    connection.end();

    if (userLogin.rows[0]) {
      return {
        id: userLogin.rows[0].id,
        password: userLogin.rows[0].password,
        userName: userLogin.rows[0].user_name,
        userId: userLogin.rows[0].account_id,
        profile: {
          id: userLogin.rows[0].profile_id,
        },
      };
    }

    throw Error("not_found");
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

exports.changeUser = async (userId, bodyToChange) => {
  let connection = dbConnection();

  connection.connect(function (err) {
    if (err) {
      throw err;
    }
    console.log("Conectado");
  });

  try {
    let user = await this.getUser(userId);

    const sqlCompany = "update company set name=$1 where id=$2";
    const sqlValuesCompany = [bodyToChange.company.name, user.company_id];

    const companyChanged = await connection.query(sqlCompany, sqlValuesCompany);

    connection.end();

    return companyChanged.rows[0];
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};

exports.changeUserName = async (userId, bodyToChange) => {
  let connection = dbConnection();

  connection.connect(function (err) {
    if (err) {
      throw err;
    }
    console.log("Conectado");
  });

  try {
    const sqlChangeAccount =
      "update account set name=$1 where id=$2 RETURNING *";
    const sqlValuesAccount = [bodyToChange.name, userId];

    const accountChanged = await connection.query(
      sqlChangeAccount,
      sqlValuesAccount
    );

    connection.end();

    return {
      id: accountChanged.rows[0].id,
      name: accountChanged.rows[0].name,
    };
  } catch (err) {
    console.log(err);
  } finally {
    connection.end();
  }
};
