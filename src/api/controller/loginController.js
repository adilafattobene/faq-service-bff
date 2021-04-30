const loginService = require("../services/loginService");

exports.getLogin = async (req, res) => {
  try {
    const response = await loginService.getLogin(req.body);

    return res.status(200).send(response);
  } catch (err) {
    if (err.message === "invalid_password") {
      return res.status(403).send({ message: "Invalid Password." });
    }

    return res.status(500).send("Erro getLogin " + err);
  }
};

exports.checkToken = (req, res, next) => {
  try {
    const response = loginService.checkToken(req.body);
    return res.status(200).send("Requisição token: " + response);
  } catch (err) {
    return res.status(500).send("Erro Requisição token " + err);
  }
};
