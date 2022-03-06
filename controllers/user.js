const BigPromise = require("../middlewares/bigPromise");

exports.signup = BigPromise((req,res)=>{
  
})

exports.login = BigPromise((req, res) => {
  res.status(200).json({ success: true });
});
