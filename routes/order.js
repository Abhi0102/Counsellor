const express = require("express");

const Router = express.Router();

const { confirmPayment, bookOffer } = require("../controllers/order");

const { isLoggedIn, customRole } = require("../middlewares/user");

Router.route("/getofferdetail/:id").post(isLoggedIn, bookOffer);

Router.route("/confirmpayment").post(isLoggedIn, confirmPayment);
module.exports = Router;
