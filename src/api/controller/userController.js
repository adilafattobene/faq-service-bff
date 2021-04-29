const client = require("../clients/accountServiceClient");
const service = require("../services/userService");

exports.getUser = async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  try {
    const response = await service.getUser(token, req.params.id);

    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    if (err.message === "not_found") {
      return res.status(404).json({ message: "User not found." });
    }

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Expired token." });
    }

    if (err.name === "JsonWebTokenError") {
      switch (err.message) {
        case "invalid token":
        case "jwt malformed":
          return res.status(401).json({ message: "Invalid token." });
        default:
          return res.status(500).json({
            message: "Erro durante validação do token na requisição getUser.",
          });
      }
    }

    return res.status(500).send("Erro Requisição getUser " + err);
  }
};

exports.getUsersById = async (req, res) => {
  const token = req.headers["x-access-token"];

  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  try {
    const response = await service.getUsersById(token, req.params.id);

    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    if (err.message === "not_found") {
      return res.status(404).json({ message: "User not found." });
    }

    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Expired token." });
    }

    if (err.message === "not_authorized") {
      return res
        .status(403)
        .json({ message: "Not authorized to request this resource." });
    }

    if (err.name === "JsonWebTokenError") {
      switch (err.message) {
        case "invalid token":
        case "jwt malformed":
          return res.status(401).json({ message: "Invalid token." });
        default:
          return res.status(500).json({
            message: "Erro durante validação do token na requisição getUser.",
          });
      }
    }

    return res.status(500).send("Erro Requisição getUser " + err);
  }
};

exports.createUser = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  try {
    service.createUser(token, req.body, function (response) {
      return res.status(201).json(response);
    });
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ auth: false, message: "Invalid token." });
    }

    if (err.message === "Unauthorized") {
      return res.status(401).json({ auth: false, message: "Unauthorized." });
    }

    if (err.message === "MissingProfileError") {
      return res.status(401).json({
        auth: false,
        message: "Missing profile to create a new user.",
      });
    }

    if (err.message === "NotPermitedError") {
      return res
        .status(403)
        .json({ auth: false, message: "Unauthorized to create a new user." });
    }

    console.log(err);

    return res.status(500).send("Erro Requisição createUser " + err);
  }
};

exports.changeUser = (req, res, next) => {
  //TODO
  //receber a informação e passar para o service account
  let userChanged = client.changeUser;

  res.send("Requisição changeUser");
};
