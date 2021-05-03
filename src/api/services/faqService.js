const cmsServiceClient = require("../clients/cmsServiceClient");
const jwtService = require("../services/jwtService");
const userService = require("../services/userService");

exports.getFaq = async (token) => {
  try {
    if (!token) {
      let faq = await cmsServiceClient.getFaq("public");

      return faq;
    }

    const jwtResponse = await jwtService.verifyToken(token);

    const profile = await userService.getProfile(jwtResponse.profileId);

    let faq = await cmsServiceClient.getFaq(profile.description);

    return faq;
  } catch (err) {
    throw err;
  }
};

exports.getFaqBySlug = async (token, slug) => {
  try {
    if (!token) {
      let faq = await cmsServiceClient.getFaqBySlug("public", slug);

      return faq;
    }

    const jwtResponse = await jwtService.verifyToken(token);

    const profile = await userService.getProfile(jwtResponse.profileId);

    let faq = await cmsServiceClient.getFaqBySlug(profile.description, slug);

    return faq;
  } catch (err) {
    throw err;
  }
};
