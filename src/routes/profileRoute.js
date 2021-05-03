const controller = require("../api/controller/profileController");

module.exports = (app) => {
  app.get("/profile", controller.getProfiles);
};
