const controller = require("../controller/loginController");

module.exports = app => {
    app.get("/login", controller.getLogin);
    app.post("/login", controller.createLogin);
    app.post("/login/auth", controller.checkToken);
};