const profileService = require("../services/profileService");

exports.getProfiles = async (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).json({ auth: false, message: "No token provided." });

  try {
    const response = await profileService.getProfiles(token);

    return res.status(200).json(response);
  } catch (err) {
    if (err.message === "resource_not_found_error") {
      return res.status(404).json({ message: "Profiles not found." });
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

    return res.status(500).json("Erro Requisição getUser " + err);
  }
};
