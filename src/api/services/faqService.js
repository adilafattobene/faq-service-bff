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

exports.getFaqBySlug = (token, slug, next) => {
  try {
    if (token) {
      jwtService.verifyToken(token, function (response) {
        let faq = cmsServiceClient.getFaqBySlug(response.profile, slug);

        if (faq) {
          return next(faq);
        } else {
          throw Error("NotFound");
        }
      });
    } else {
      let faq = cmsServiceClient.getFaqBySlug("DEFAULT", slug);

      return next(faq);
    }
  } catch (err) {
    throw err;
  }
};
