const express = require("express");
const Router = express.Router();
const { login, signup } = require("../controllers/user");

Router.route("/").get(login);
Router.route("/signup").post(signup);

module.exports = Router;
