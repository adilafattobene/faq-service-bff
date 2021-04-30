const axios = require("axios");

exports.getUser = async function (userId) {
  try {
    const res = await axios.get("http://localhost:8080/user/" + userId);

    return res.data;
  } catch (error) {
    throw new Error("not_found");
  }
};

exports.getUsersById = async function (userId) {
  try {
    const res = await axios.get(
      "http://localhost:8080/user/" + userId + "/users"
    );
    return res.data.map(function (user) {
      return {
        id: user.id,
        name: user.name,
        userName: user.login.userName,
        profile: user.login.profile.description,
      };
    });
  } catch (error) {
    throw new Error("not_found");
  }
};

exports.getUserLogin = async function (userId) {
  try {
    const res = await axios.get("http://localhost:8080/login/user/" + userId);

    return res.data;
  } catch (error) {
    throw new Error("not_found");
  }
};

exports.getUserPassword = (userEmail) => {
  //TODO GET
  let resp = {
    userId: "c9ac28ac-dad7-42c5-b062-4be9428453db",
    password: "$2y$15$EAY2oU/b21m84rEDJ8ql7.BlDYdh23A5qQX3QUkDiWw40Y5RTyeXq ",
  };

  return resp;
};

exports.createUserChild = async function (userId, user) {
  try {
    const userToClient = {
      name: user.name,
      company: {
        id: user.companyId,
      },
      login: {
        password: user.password,
        userName: user.userName,
        profile: {
          id: user.profileId,
        },
      },
    };

    const res = await axios.post(
      "http://localhost:8080/user/" + userId,
      userToClient
    );

    return res.data;
  } catch (error) {
    throw new Error("not_found");
  }
};

exports.createUser = async function (user) {
  try {
    const userToClient = {
      name: user.name,
      company: {
        name: user.companyName,
      },
      login: {
        password: user.password,
        userName: user.userName,
      },
    };

    const res = await axios.post("http://localhost:8080/user", userToClient);

    return res.data;
  } catch (error) {
    if(error.response.data.error === "conflict_error"){
      throw new Error("conflict_error");
    }

    throw new Error(error);
  }
};

exports.createUserLogin = (user) => {
  //TODO POST
  let resp = {
    userId: "c9ac28ac-dad7-42c5-b062-4be9428453db",
    email: "teste@teste.com.br",
    profile: "OWNER",
  };

  return resp;
};

exports.changeUser = (user, userId) => {
  //TODO PUT
  let resp = {
    userId: userId,
    email: "teste@teste.com.br",
    profile: "OWNER",
  };

  return resp;
};
