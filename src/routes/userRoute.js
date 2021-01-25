const controller = require("../api/controller/userController");

module.exports = app => {
    app.get("/users/:id", controller.getUser);
    app.post("/users/signup", controller.createUser);
};
