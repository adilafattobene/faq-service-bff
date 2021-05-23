const controller = require("../api/controller/userController");

module.exports = (app) => {
  app.get("/user/:id", controller.getUser);
  app.get("/user/:id/users", controller.getUsersById);
  app.post("/user", controller.createUser);
  app.post("/user/:id", controller.createChild);
  app.put("/user/:id/company", controller.changeCompany);
};
