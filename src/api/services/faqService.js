const e = require("express");
const cmsServiceClient = require("../clients/cmsServiceClient");
const jwtService = require("../services/jwtService");
const userService = require("../services/userService");

exports.getFaqs = async (token) => {
  try {
    if (!token) {
      let faq = await cmsServiceClient.getFaqs("public");

      return faq;
    }

    const jwtResponse = await jwtService.verifyToken(token);

    const profile = await userService.getProfile(jwtResponse.profileId);

    let faq = await cmsServiceClient.getFaqs(profile.description);

    return faq;
  } catch (err) {
    //TODO Posso fazer isso? Pode dar sensação de um bug no front.
    // Nesse caso, qdo o bff recebe um token expirado, ele vai buscar as 
    // faqs com o perfil público, retornando um 200. Legal seria se eu 
    // conseguisse retornar um 401, com um body contendo as faqs públicas.
    // *Pensamento* Seria essa uma prática ruim - 401 com conteúdo?
    if(err.name === "TokenExpiredError"){
      return this.getFaqs();
    }

    throw err;
  }
};

exports.getFaqBySlug = async (token, slug) => {
  if (!slug) {
    throw new Error("slug_required");
  }

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
