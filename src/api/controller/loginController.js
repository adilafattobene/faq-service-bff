const loginService = require("../services/loginService");

exports.getLogin = (req, res, next) => {
    try {
        const response = await loginService.getLogin(req.body);
        return res.status(200).send("Requisição getLogin: " + response);
    } catch (err){
        return res.status(500).send("Erro getLogin " + err);
    }
};

exports.createLogin = async (req, res, next) => {
    try {
        const response = await loginService.createLogin(req.body);
        console.log(response)
        return res.status(201).send("Requisição criaçãoLogin: " + response);
    } catch (err){
        return res.status(500).send("Erro createLogin");
    }
};

exports.checkToken = (req, res, next) => {
    try {
        const response = await loginService.checkToken(req.body);
        return res.status(200).send("Requisição token: " + response);
    } catch (err){
        return res.status(500).send("Erro Requisição token " + err);
    }
};