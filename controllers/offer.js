const BigPromise = require("../middlewares/bigPromise");
const Offer = require("../models/offer");

exports.addOffer = BigPromise(async (req, res, next) => {
  const {
    title,
    license,
    description,
    workingDays,
    fromTime,
    toTime,
    expertise,
    experience,
    price,
  } = req.body;

  if (
    !title ||
    !license ||
    !description ||
    !workingDays ||
    !fromTime ||
    !toTime ||
    !expertise ||
    !experience ||
    !price
  ) {
    return next(
      new Error(
        "Please check all required fields are being sent. Title, License, Description, Working Days, fromTime, toTime, Expertise, Experience & Price are required."
      )
    );
  }

  const offeredProduct = await Offer.find({ user: req.user.id });

  if (offeredProduct.length) {
    return next(new Error("User can offer only one option at a time."));
  }

  const offer = await Offer.create({
    title,
    license,
    description,
    workingDays,
    fromTime,
    toTime,
    expertise,
    experience,
    price,
    user: req.user.id,
  });

  const data = {
    title: offer.title,
    license: offer.license,
    description: offer.description,
    workingDays: offer.workingDays,
    fromTime: offer.fromTime,
    toTime: offer.toTime,
    expertise: offer.expertise,
    experience: offer.experience,
    price: offer.price,
  };
  res.status(200).json({ success: true, data });
});

exports.getCounsellorOffer = BigPromise(async (req, res, next) => {
  let offer = await Offer.findOne({ user: req.user.id });

  if (!offer) {
    return next(new Error("No Offer Found."));
  }
  //   offer = offer[0];
  const data = {
    title: offer.title,
    license: offer.license,
    description: offer.description,
    workingDays: offer.workingDays,
    fromTime: offer.fromTime,
    toTime: offer.toTime,
    expertise: offer.expertise,
    experience: offer.experience,
    price: offer.price,
  };
  res.status(200).json({ success: true, data });
});

exports.deleteCounsellorOffer = BigPromise(async (req, res, next) => {
  const offer = await Offer.findOne({ user: req.user.id });
  if (!offer) {
    return next(new Error("Nothing to delete."));
  }

  await offer.remove();
  res
    .status(200)
    .json({ success: true, message: "Offer Successfully Deleted." });
});

exports.updateCounsellorOffer = BigPromise(async (req, res, next) => {
  let newData = {};
  for (let i in req.body) {
    if (req.body[i]) {
      newData[i] = req.body[i];
    }
  }

  if (!Object.keys(newData).length) {
    return next(new Error("Nothing to update."));
  }

  const offer = await Offer.findOneAndUpdate({ user: req.user.id }, newData, {
    new: true,
    runValidators: true,
  });
  const data = {
    title: offer.title,
    license: offer.license,
    description: offer.description,
    workingDays: offer.workingDays,
    fromTime: offer.fromTime,
    toTime: offer.toTime,
    expertise: offer.expertise,
    experience: offer.experience,
    price: offer.price,
  };
  res.status(200).json({ success: true, data });
});
