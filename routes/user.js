const express = require("express");
const Router = express.Router();
const { login, signup, getUserDetail } = require("../controllers/user");
const { isLoggedIn } = require("../middlewares/user");

Router.route("/login").post(login);
Router.route("/signup").post(signup);
Router.route("/getuser").get(isLoggedIn, getUserDetail);

Router.route("/testdata").post(function (req, res) {
  console.log(req.body);
  console.log(req.files);
  res.status(200).json({ success: true, data: req.body });
});

module.exports = Router;
