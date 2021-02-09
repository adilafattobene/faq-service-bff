exports.getUser = (userId) => {

  //TODO GET
  let resp = {
    userId: "c9ac28ac-dad7-42c5-b062-4be9428453da",
    email: "testeA@teste.com.br",
    profile: "OWNER",
    userChildren: [
      {
        userId: "c9ac28ac-dad7-42c5-b062-4be9428453db",
        email: "testeB@teste.com.br",
        profile: "CAIXA"
      },
      {
        userId: "c9ac28ac-dad7-42c5-b062-4be9428453dc",
        email: "testeB@teste.com.br",
        profile: "DRIVER"
      },
    ],
  };

  return resp;
};

// exports.getUserByEmail = (userEmail) => {

//   console.log(userEmail);
  
//   //TODO GET
//   let resp = {
//     userId: "c9ac28ac-dad7-42c5-b062-4be9428453db",
//     email: "teste@teste.com.br",
//     profile: "OWNER",
//     userChildren: [
//       {
//         userId: "c9ac28ac-dad7-42c5-b062-4be9428453db",
//         email: "teste@teste.com.br",
//         profile: "CAIXA"
//       },
//       {
//         userId: "c9ac28ac-dad7-42c5-b062-4be9428453db",
//         email: "teste@teste.com.br",
//         profile: "DRIVER"
//       },
//     ],
//   };

//   return resp;
// };

exports.getUserPassword = (userEmail) => {
  //TODO GET
  let resp = {
    userId: "c9ac28ac-dad7-42c5-b062-4be9428453db",
    password: "$2y$15$EAY2oU/b21m84rEDJ8ql7.BlDYdh23A5qQX3QUkDiWw40Y5RTyeXq ",
  };

  return resp;
};

exports.createUser = ( user ) => {
  //TODO POST
  let resp = {
    userId: "c9ac28ac-dad7-42c5-b062-4be9428453db",
    email: "teste@teste.com.br",
    profile: user.profile,
    name: "Usuário Teste"
  };

  return resp;
}

exports.createUserLogin = (user) => {
  //TODO POST
  let resp = {
    userId: "c9ac28ac-dad7-42c5-b062-4be9428453db",
    email: "teste@teste.com.br",
    profile: "OWNER"
  };

  return resp;
}

exports.changeUser = (user, userId) => {
  //TODO PUT
  let resp = {
    userId: userId,
    email: "teste@teste.com.br",
    profile: "OWNER"
  };

  return resp;
}
