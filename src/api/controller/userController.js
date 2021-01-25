const client = require("../clients/accountServiceClient");

exports.getUser = (req, res, next) => {
  //TODO
  //Verificar se está autenticado

  //Buscar user
  let user = client.getUser;

  //Criptografar

  //Retornar ao front

  res.send("Requisição getUserById: " + req.params.id);
};

exports.createUser = (req, res, next) => {
  //TODO
  //receber a informação e passar para o service account
  let userCreated = client.createUser;

  res.send("Requisição createUser");
};

exports.changeUser = (req, res, next) => {
    //TODO
    //receber a informação e passar para o service account
    let userChanged = client.changeUser;
  
    res.send("Requisição changeUser");
  };
