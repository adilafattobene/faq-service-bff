const express = require("express");
const consign = require("consign");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

consign({ cwd: "./src" }).include("routes").into(app);

module.exports = app;
