const controller = require("../api/controller/userController");

module.exports = app => {
    app.get("/user/:id", controller.getUser);
    app.get("/user/:id/users", controller.getUsersById);
    app.post("/users", controller.createUser);
    app.post("/user/:id", controller.createChild); 
};
