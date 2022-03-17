const express = require("express");

const Router = express.Router();

const {
  confirmPayment,
  bookOffer,
  getOrders,
  addReview,
} = require("../controllers/order");

const { isLoggedIn, customRole } = require("../middlewares/user");

Router.route("/getofferdetail/:id").post(isLoggedIn, bookOffer);

Router.route("/confirmpayment").post(isLoggedIn, confirmPayment);

Router.route("/myorders").get(isLoggedIn, getOrders);

Router.route("/addreview").post(isLoggedIn, addReview);
module.exports = Router;
