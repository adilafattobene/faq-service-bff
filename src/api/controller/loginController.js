const loginService = require("../services/loginService");

exports.getLogin = (req, res, next) => {
    try {
        const response = loginService.getLoginByEmail(req.params);
        
        return res.status(200).send(response);
    } catch (err){
        return res.status(500).send("Erro getLogin " + err);
    }
};

exports.createLogin = async (req, res, next) => {
    try {
        const response = await loginService.createLogin(req.body);
        return res.status(201).send("Requisição criaçãoLogin: " + response);
    } catch (err){
        return res.status(500).send("Erro createLogin");
    }
};

exports.checkToken = (req, res, next) => {
    try {
        const response = loginService.checkToken(req.body);
        return res.status(200).send("Requisição token: " + response);
    } catch (err){
        return res.status(500).send("Erro Requisição token " + err);
    }
};