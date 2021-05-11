const accountClient = require("../clients/accountServiceClient");
const jwtService = require("../services/jwtService");

exports.getProfiles = async (token) => {
  try {
    const jwtResponse = await jwtService.verifyToken(token);

    if (jwtResponse.profileId != "fcec55dc-9d24-4c0d-99ad-c99960660f2c") {
      throw Error("not_authorized");
    }

    const res = await accountClient.getProfiles();
    return res;
  } catch (err) {
    throw err;
  }
};
