const controller = require("../api/controller/faqController");

module.exports = app => {
    app.get("/faq", controller.getFaq); //TODO
    app.get("/faq/:slug", controller.getFaqBySlug); //TODO
};