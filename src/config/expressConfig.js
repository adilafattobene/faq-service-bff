const express = require("express");
const consign = require("consign");
const app = express();

consign({ cwd: "./src/app" })
    .include("routes")
    .into(app);

module.exports = app;
