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

exports.createUser = (user) => {
  //TODO POST
  let resp = {
    userId: "c9ac28ac-dad7-42c5-b062-4be9428453db",
    email: "teste@teste.com.br",
    profile: user.profile,
    name: "Usuário Teste",
  };

  return resp;
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
