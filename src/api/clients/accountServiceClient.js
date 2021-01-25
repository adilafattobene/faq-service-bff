exports.getUser = (userId) => {

  //TODO GET
  let resp = {
    userId: "c9ac28ac-dad7-42c5-b062-4be9428453db",
    password: "$2y$15$EAY2oU/b21m84rEDJ8ql7.BlDYdh23A5qQX3QUkDiWw40Y5RTyeXq ",
    profile: ""
  };

  return JSON.stringify(resp);
};

exports.getUserPassword = (userEmail) => {
  //TODO GET
  let resp = {
    userId: "c9ac28ac-dad7-42c5-b062-4be9428453db",
    password: "$2y$15$EAY2oU/b21m84rEDJ8ql7.BlDYdh23A5qQX3QUkDiWw40Y5RTyeXq ",
  };

  return JSON.stringify(resp);
};

exports.createUser = (user) => {
  //TODO POST
  let resp = {
    userId: "c9ac28ac-dad7-42c5-b062-4be9428453db",
    email: "teste@teste.com.br",
    password: "$2y$15$EAY2oU/b21m84rEDJ8ql7.BlDYdh23A5qQX3QUkDiWw40Y5RTyeXq ",
    profile: "OWNER",
    name: "Usuário Teste"
  };

  return JSON.stringify(resp);
}

exports.createUserLogin = async (user) => {
  //TODO POST
  let resp = {
    userId: "c9ac28ac-dad7-42c5-b062-4be9428453db",
    email: "teste@teste.com.br",
    password: "$2y$15$EAY2oU/b21m84rEDJ8ql7.BlDYdh23A5qQX3QUkDiWw40Y5RTyeXq ",
    profile: "OWNER"
  };

  return JSON.stringify(resp);
}

exports.changeUser = (user, userId) => {
  //TODO PUT
  let resp = {
    userId: userId,
    email: "teste@teste.com.br",
    password: "$2y$15$EAY2oU/b21m84rEDJ8ql7.BlDYdh23A5qQX3QUkDiWw40Y5RTyeXq ",
    profile: "OWNER"
  };

  return JSON.stringify(resp);
}
