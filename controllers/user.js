const cookietoken = require("../utils/cookietoken");
const BigPromise = require("../middlewares/bigPromise");
const User = require("../models/user");
const cloudinary = require("cloudinary").v2;

exports.signup = BigPromise(async (req, res, next) => {
  const { email, name, password, dob, qualification, aboutme, phno, role } =
    req.body;

  // If Details are missing

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

  //  Extracting Photo detail

  let file = req.files.photo;

  // Creating New User

  const user = await User.create({
    name,
    email,
    password,
    dob,
    qualification,
    aboutme,
    phno,
    role,
    // photo: {
    //   id: picUploadResult.public_id,
    //   secure_url: picUploadResult.secure_url,
    // },
  });

  // Updloading to cloudinary

  const picUploadResult = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "counsellorUsers",
    width: 150,
    crop: "scale",
  });

  // Adding Photo Path to user

  user.photo = {
    id: picUploadResult.public_id,
    secure_url: picUploadResult.secure_url,
  };

  // Saving user

  user.save({ validateBeforeSave: false });

  // On Successful Signup

  cookietoken(user, res);
});

exports.login = BigPromise(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new Error("Email & Password are required."));
  }

  // Check User in DB

  const user = await User.findOne({ email }).select("+password");

  // If user not found

  if (!user) {
    return next(new Error("User is not registered. Please check email id."));
  }

  // If user Found - Compare passwords

  const isValidPassword = await user.isPasswordValid(password);

  // If passoword does not match

  if (!isValidPassword) {
    return next(new Error("Password is incorrect."));
  }

  // If Password is valid

  cookietoken(user, res);

  res.status(200).json({ success: true });
});
