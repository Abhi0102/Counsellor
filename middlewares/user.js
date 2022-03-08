const BigPromise = require("./bigPromise");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
exports.isLoggedIn = BigPromise(async (req, res, next) => {
  const token = req.cookies[process.env.COOKIE_TOKEN_NAME];

  if (!token) {
    return next(new Error("Please Login First to access this page."));
  }

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decode.id);
  next();
});
