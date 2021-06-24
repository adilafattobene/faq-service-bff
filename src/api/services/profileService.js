const accountClient = require("../clients/accountServiceClient");
const jwtService = require("../services/jwtService");
const userModel = require("../models/userModel");

exports.getProfiles = async (token) => {
  try {
    const jwtResponse = await jwtService.verifyToken(token);

    if (jwtResponse.profileId != "fcec55dc-9d24-4c0d-99ad-c99960660f2c") {
      throw Error("not_authorized");
    }

    let profiles;

    if (process.env.DSWL_PROJECT_USE_MODELS) {
      profiles = await userModel.getProfiles();
    } else {
      profiles = await accountClient.getProfiles();
    }

    return profiles;
  } catch (err) {
    throw err;
  }
};
