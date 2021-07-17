const client = require("../clients/accountServiceClient");
const service = require("../services/userService");
const jwtService = require("../services/jwtService");

exports.getUser = async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  try {
    const response = await service.getUser(token, req.params.id);

    return res.status(200).json(response);
  } catch (err) {
    if (err.message === "not_found") {
      return res.status(404).json({ message: "User not found." });
    }

    if (err.message === "not_authorized") {
      return res
        .status(403)
        .json({ message: "Not authorized to request this resource." });
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

    return res.status(500).json({ message: "Something is wrong - getUser." });
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

    return res.status(500).json({ message: "Something is wrong - getUsers." });
  }
};

exports.createUser = async (req, res) => {
  const token = req.headers["x-access-token"];
  if (token)
    return res.status(400).json({
      auth: false,
      message: "A token was provided but it is not required.",
    });

  try {
    const response = await service.createUser(req.body);

    const jwtToken = jwtService.createJwtToken(response);

    return res.status(201).json({ token: jwtToken });
  } catch (err) {
    if (err.message === "conflict_error") {
      return res.status(409).json({ message: "user_conflict" });
    }
    return res
      .status(500)
      .json({ message: "Something is wrong - createUser." });
  }
};

exports.createChild = async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  try {
    const response = await service.createChild(token, req.body, req.params.id);

    return res.status(201).json(response);
  } catch (err) {
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
            message:
              "Erro durante validação do token na requisição createChild.",
          });
      }
    }

    if (err.message === "invalid_profile") {
      return res.status(401).json({
        auth: false,
        message: "Missing profile to create a new user.",
      });
    }

    if (err.message === "owner_not_found") {
      return res.status(404).json({
        auth: false,
        message: "User owner not found",
      });
    }

    if (err.message === "unauthorized_profile") {
      return res.status(401).json({
        auth: false,
        message: "Unauthorized profile to create a new user.",
      });
    }

    if (err.message === "unauthorized_token") {
      return res.status(401).json({
        auth: false,
        message: "Unauthorized token to create a new user.",
      });
    }

    if (err.message === "conflict_error") {
      return res.status(409).json({
        auth: false,
        message: "There is a user with this crendentials.",
      });
    }

    return res
      .status(500)
      .json({ message: "Something is wrong - createChild." });
  }
};

exports.changeUser = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  try {
    const response = await service.changeUser(token, req.body, req.params.id);

    return res.status(201).json(response);
  } catch (err) {
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
            message:
              "Erro durante validação do token na requisição changeUser - name.",
          });
      }
    }

    if (err.message === "unauthorized_token") {
      //
      return res.status(401).json({
        auth: false,
        message: "Unauthorized token to changeUser - name.",
      });
    }

    if (err.message === "resource_not_found_error") {
      //
      return res.status(401).json({
        auth: false,
        message:
          "Não foi encontrado o usuário para alteração - changeUser - name.",
      });
    }

    return res
      .status(500)
      .json({ message: "Something is wrong - changeUser - name." });
  }
};

exports.changeCompany = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  try {
    const response = await service.changeUserCompany(
      token,
      req.body,
      req.params.id
    );

    return res.status(201).json(response);
  } catch (err) {
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
            message:
              "Erro durante validação do token na requisição changeUser.",
          });
      }
    }

    if (err.message === "unauthorized_profile") {
      //
      return res.status(401).json({
        auth: false,
        message: "Unauthorized profile to changeUser.",
      });
    }

    if (err.message === "unauthorized_token") {
      //
      return res.status(401).json({
        auth: false,
        message: "Unauthorized token to changeUser.",
      });
    }

    if (err.message === "NotPermitedError") {
      //
      return res.status(401).json({
        auth: false,
        message: "Unauthorized profile to changeUser.",
      });
    }

    if (err.message === "resource_not_found_error") {
      //
      return res.status(401).json({
        auth: false,
        message: "Não foi encontrado o usuário para alteração - changeUser.",
      });
    }

    return res
      .status(500)
      .json({ message: "Something is wrong - changeUser." });
  }
};

exports.changeUserLogin = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  try {
    const response = await service.changeUserLogin(
      token,
      req.body,
      req.params.id
    );

    return res.status(201).json(response);
  } catch (err) {
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
            message:
              "Erro durante validação do token na requisição changeUserLogin.",
          });
      }
    }

    if (err.message === "unauthorized_profile") {
      return res.status(401).json({
        auth: false,
        message: "Unauthorized profile to changeUserLogin.",
      });
    }

    if (err.message === "unauthorized_token") {
      return res.status(401).json({
        auth: false,
        message: "Unauthorized token to changeUserLogin.",
      });
    }

    if (err.message === "NotPermitedError") {
      return res.status(401).json({
        auth: false,
        message: "Unauthorized profile to changeUserLogin.",
      });
    }

    if (err.message === "resource_not_found_error") {
      return res.status(401).json({
        auth: false,
        message:
          "Não foi encontrado o usuário para alteração - changeUserLogin.",
      });
    }

    console.log(err);
    return res
      .status(500)
      .json({ message: "Something is wrong - changeUserLogin." });
  }
};
