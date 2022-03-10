const express = require("express");

const Router = express.Router();

const {
  addOffer,
  getCounsellorOffer,
  deleteCounsellorOffer,
  updateCounsellorOffer,
} = require("../controllers/offer");
const { isLoggedIn, customRole } = require("../middlewares/user");

Router.route("/addoffer").post(isLoggedIn, customRole("Counsellor"), addOffer);

Router.route("/getcounselloroffer").get(
  isLoggedIn,
  customRole("Counsellor"),
  getCounsellorOffer
);

Router.route("/deleteoffer").delete(
  isLoggedIn,
  customRole("Counsellor"),
  deleteCounsellorOffer
);

Router.route("/updateoffer").patch(
  isLoggedIn,
  customRole("Counsellor"),
  updateCounsellorOffer
);
module.exports = Router;
