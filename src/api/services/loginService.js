const hashService = require("../services/hashService");
const jwtService = require("../services/jwtService");
const accountClient = require("../clients/accountServiceClient");

exports.getLogin = async (login) => {
  try {
    const response = await accountClient.getUserLogin(login.userId);

    if (await hashService.comparePassword(login.password, response.password)) {
      const userId = response.id;
      const profileId = response.profile.id;

      const jwtPayload = { userEmail: userId, profileId };

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

exports.createLogin = async (login, next) => {
  hashService.hashingPassword(login.password, function (hashedPassword) {
    if (!hashedPassword) {
      throw Error("Error during hash password");
    }

    let loginHashed = {
      email: login.login,
      password: hashedPassword,
    };

    const response = accountClient.createUserLogin(loginHashed);

    if (response) {
      const userEmail = response.email;
      const userProfile = response.profile;

      const jwtPayload = { userEmail, userProfile };

      const jwtToken = jwtService.createJwtToken(jwtPayload);

      return next({
        auth: true,
        token: jwtToken,
      });
    }

    throw Error("Error during creating login");
  });
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
