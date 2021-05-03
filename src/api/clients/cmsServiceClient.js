const axios = require("axios");

exports.getFaq = async function (profile) {
  try {
    const res = await axios.get(
      "http://localhost:1337/faqs?type=" + profile.toLowerCase()
    );
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};

exports.getFaqBySlug = async function (profile, slug) {
  try {
    const res = await axios.get(
      "http://localhost:1337/faqs?type=" +
        profile.toLowerCase() +
        "&slug=" +
        slug
    );

    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
