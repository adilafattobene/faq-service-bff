const client = require("../clients/accountServiceClient");

exports.getLogin = (req, res, next) => {
    //TODO

    //Buscar user
    let user = client.getUserPassword;

    res.status(200).send("Requisição login: " + user);
};

exports.createLogin = (req, res, next) => {
    //TODO

    //Criar user
    let user = client.createUser;

    res.status(200).send("Requisição criaçãoLogin: " + user);
};

exports.checkToken = (req, res, next) => {
    //TODO
    
    //Buscar userPass
    let user = client.getUserPassword;

    //Verificar se é igual ao recebido
    res.status(200).send("Requisição token: " + user);
};


