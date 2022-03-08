function errorHandler(err, req, res, next) {
  //   console.log(err.statusCode);
  //   console.error(err);
  return res.status(422).json({ success: false, error: err.message });
}

module.exports = errorHandler;
