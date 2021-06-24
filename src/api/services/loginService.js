const hashService = require("../services/hashService");
const jwtService = require("../services/jwtService");
const accountClient = require("../clients/accountServiceClient");
const userModel = require("../models/accountDbModel");

exports.getLogin = async (login) => {
  try {
    let response;

    if (process.env.DSWL_PROJECT_USE_MODELS) {
      response = await userModel.getUserLoginByUserName(login.userName);
    } else {
      response = await accountClient.getUserLoginByUserName(login.userName);
    }
    
    if (await hashService.comparePassword(login.password, response.password)) {
      const userId = response.userId;
      const profileId = response.profile.id;

      const jwtPayload = { userId: userId, profileId };

      const jwtToken = jwtService.createJwtToken(jwtPayload);

      return {
        userId,
        profileId,
        auth: true,
        token: jwtToken,
      };
    } else {
      throw Error("invalid_password");
    }
  } catch (err) {
    console.log(err)
    throw err;
  }
};
