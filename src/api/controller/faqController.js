const { compareSync } = require("bcrypt");
const service = require("../services/faqService");

exports.getFaqs = async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const response = await service.getFaqs(token);

    return res.status(200).json(response);
  } catch (err) {
    if (err.message === "NotFound") {
      return res.status(404).json({ message: "FAQ not found." });
    }

    return res.status(500).json({ message: "Something is wrong - FAQ not found." });
  }
};

exports.getFaqBySlug = async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const response = await service.getFaqBySlug(token, req.params.slug);

    return res.status(200).json(response);
  } catch (err) {
    if (err.message === "NotFound") {
      return res.status(404).json({ message: "FAQ not found." });
    }

    return res.status(500).json("Erro Requisição getUser " + err);
  }
};
