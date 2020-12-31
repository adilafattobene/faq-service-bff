const controller = require("../controller/userController");

module.exports = app => {
    app.get("/users/:id", controller.getUser);
    app.post("/users", controller.createUser);
};
