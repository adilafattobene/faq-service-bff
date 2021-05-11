const hashService = require("../services/hashService");
const jwtService = require("../services/jwtService");
const accountClient = require("../clients/accountServiceClient");

exports.getLogin = async (login) => {
  try {
    const response = await accountClient.getUserLoginByUserName(login.userName);

    if (await hashService.comparePassword(login.password, response.password)) {
      const userId = response.userId;
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
