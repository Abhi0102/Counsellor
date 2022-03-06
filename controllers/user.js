const cookietoken = require("../utils/cookietoken");
const BigPromise = require("../middlewares/bigPromise");
const User = require("../models/user");
const cloudinary = require("cloudinary").v2;

exports.signup = BigPromise(async (req, res, next) => {
  const { email, name, password, dob, qualification, aboutme, phno, role } =
    req.body;

  if (
    !email ||
    !name ||
    !password ||
    !dob ||
    !qualification ||
    !aboutme ||
    !phno ||
    !role ||
    !req.files
  ) {
    return next(new Error("Required Details are missing."));
  }

  let file = req.files.photo;

  const picUploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "counsellorUsers",
    width: 150,
    crop: "scale",
  });

  const user = await User.create({
    name,
    email,
    password,
    dob,
    qualification,
    aboutme,
    phno,
    role,
    photo: {
      id: picUploadResult.public_id,
      secure_url: picUploadResult.secure_url,
    },
  });

  cookietoken(user, res);
});

exports.login = BigPromise((req, res) => {
  res.status(200).json({ success: true });
});
