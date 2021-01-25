const app = require("./config/expressConfig");
require('dotenv').config();

const serverPort = process.env.SERVER_PORT || 3000;

console.log(process.env.SERVER_PORT)
app.listen(serverPort, () => console.log("Server listening in port " + serverPort));