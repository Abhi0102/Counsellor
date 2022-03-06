const express = require("express");
const Router = express.Router();
const { login } = require("../controllers/user");

Router.route("/").get(login);

module.exports = Router;
