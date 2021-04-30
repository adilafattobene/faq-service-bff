const hashService = require("../services/hashService");
const jwtService = require("../services/jwtService");
const accountClient = require("../clients/accountServiceClient");

exports.getLogin = async (login) => {
  try {
    const response = await accountClient.getUserLogin(login.userId);

    if (await hashService.comparePassword(login.password, response.password)) {
      const userId = login.userId;
      const profileId = response.profile.id;

      const jwtPayload = { userId: userId, profileId };

      const jwtToken = jwtService.createJwtToken(jwtPayload);

      return {
        auth: true,
        token: jwtToken,
      };
    } else {
      throw Error("invalid_password");
    }
  } catch (err) {
    throw err;
  }
};

//TODO
exports.checkToken = async (login) => {
  //TODO

  //Buscar userPass
  let user = client.getUserPassword;

  return {
    email: "email",
    jwtToken: "token",
  };
};
