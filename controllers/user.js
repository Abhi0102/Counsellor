const BigPromise = require("../middlewares/bigPromise");

exports.login = BigPromise((req, res) => {
  res.status(200).json({ success: true });
});
