const controller = require("../api/controller/loginController");

module.exports = app => {
    app.post("/login", controller.getLogin);
    // app.post("/login", controller.createLogin);
    app.post("/login/auth", controller.checkToken);
};