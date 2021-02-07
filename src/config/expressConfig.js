const express = require("express");
const consign = require("consign");
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json());

consign({ cwd: "./src" })
    .include("routes")
    .into(app);

module.exports = app;
