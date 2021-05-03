const controller = require("../api/controller/loginController");

module.exports = (app) => {
  app.post("/login", controller.getLogin);
};
