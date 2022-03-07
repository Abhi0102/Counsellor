const express = require("express");
const Router = express.Router();
const { login, signup } = require("../controllers/user");

Router.route("/login").post(login);
Router.route("/signup").post(signup);

Router.route("/testdata").post(function (req, res) {
  console.log(req.body);
  res.status(200).json({ success: true, data: req.body });
});

module.exports = Router;
