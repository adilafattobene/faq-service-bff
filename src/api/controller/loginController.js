const loginService = require("../services/loginService");

exports.getLogin = async (req, res) => {
  try {
    const response = await loginService.getLogin(req.body);

    return res.status(200).json(response);
  } catch (err) {
    if (err.message === "invalid_password") {
      return res.status(403).json({ message: "Invalid Password." });
    }

    if (err.message === "not_found") {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(500).json({ message: "Something is wrong - getLogin." });
  }
};
