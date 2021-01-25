const client = require("../clients/accountServiceClient");
const loginService = require("../services/loginService");

exports.getLogin = (req, res, next) => {
    //TODO

    //Buscar user
    let user = client.getUserPassword("email@teste");

    res.status(200).send("Requisição login: " + user);
};

exports.createLogin = async (req, res, next) => {
    console.log(req.body)
    try {
        const response = await loginService.createLogin(req.body);
        console.log(response)
        return res.status(201).send("Requisição criaçãoLogin: " + response);
    } catch (err){
        return res.status(500).send("Erro createLogin");
    }
};

exports.checkToken = (req, res, next) => {
    //TODO

    //Buscar userPass
    let user = client.getUserPassword;

    //Verificar se é igual ao recebido
    res.status(200).send("Requisição token: " + user);
};

hashingPassword = function (psw, next) {
    const saltRounds = 10;

    bcrypt.hash(psw, saltRounds).then(function (hash) {
        if (!hash) {
        next();
        }
        next(hash);
    });
};
