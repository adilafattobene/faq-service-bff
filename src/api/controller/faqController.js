const { compareSync } = require("bcrypt");
const service = require("../services/faqService");

exports.getFaq = async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const response = await service.getFaq(token);

    return res.status(200).json(response);
  } catch (err) {
    if (err.message === "NotFound") {
      return res.status(404).json({ message: "FAQ not found." });
    }

    return res.status(500).send("Erro Requisição getUser " + err);
  }
};

exports.getFaqBySlug = (req, res, next) => {
  const token = req.headers["x-access-token"];

  try {
    service.getFaqBySlug(token, req.params.slug, function (response) {
      return res.status(200).json(response);
    });
  } catch (err) {
    if (err.message === "NotFound") {
      return res.status(404).json({ message: "FAQ not found." });
    }

    return res.status(500).send("Erro Requisição getUser " + err);
  }
};
