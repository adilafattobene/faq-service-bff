const controller = require("../api/controller/faqController");

module.exports = app => {
    app.get("/faq", controller.getFaq);
};