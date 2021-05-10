const loginService = require("../services/loginService");

exports.getLogin = async (req, res) => {
  try {
    const response = await loginService.getLogin(req.body);

    return res.status(200).json(response);
  } catch (err) {
    if (err.message === "invalid_password") {
      return res.status(403).json({ message: "Invalid Password." });
    }

    return res.status(500).json("Erro getLogin " + err);
  }
};
