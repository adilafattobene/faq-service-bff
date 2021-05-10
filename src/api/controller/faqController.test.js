const service = require("../services/faqService");
const controller = require("./faqController");

const { compareSync } = require("bcrypt");
const service = require("../services/faqService");

describe("getFaq unit test", () => {
  test("should return 200", async () => {
    //TODO
  });

  test("should return 404", async () => {
   //TODO
  });

  test("should return 500", async () => {
   //TODO
  });
});


// exports.getFaq = async (req, res) => {
//   const token = req.headers["x-access-token"];

//   try {
//     const response = await service.getFaq(token);

//     return res.status(200).json(response);
//   } catch (err) {
//     if (err.message === "NotFound") {
//       return res.status(404).json({ message: "FAQ not found." });
//     }

//     return res.status(500).send("Erro Requisição getUser " + err);
//   }
// };

describe("getFaqBySlug unit test", () => {
  test("should return 200", async () => {
    //TODO
  });

  test("should return 404", async () => {
   //TODO
  });

  test("should return 500", async () => {
   //TODO
  });
});


// exports.getFaqBySlug = async (req, res) => {
//   const token = req.headers["x-access-token"];

//   try {
//     const response = await service.getFaqBySlug(token, req.params.slug);

//     return res.status(200).json(response);
//   } catch (err) {
//     if (err.message === "NotFound") {
//       return res.status(404).json({ message: "FAQ not found." });
//     }

//     return res.status(500).send("Erro Requisição getUser " + err);
//   }
// };
