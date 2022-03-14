const BigPromise = require("../middlewares/bigPromise");
const Offer = require("../models/offer");
const Order = require("../models/order");
const { initiatePayment } = require("./payment");

exports.bookOffer = BigPromise(async (req, res, next) => {
  // If conselling date is empty.
  if (!req.body.counsellingDate) {
    return next(new Error("Counselling Date is Required."));
  }
  //   Getting Day from Date
  const bookingDay = new Date(req.body.counsellingDate).toLocaleString(
    "en-us",
    {
      weekday: "long",
    }
  );

  const offer = await Offer.findById(req.params.id);
  // If bookingDay is not in Working Days
  if (!offer.workingDays.includes(bookingDay)) {
    return next(
      new Error(
        "Counsellor does not work on the day. Please refer to the working days and then book the session."
      )
    );
  }
  // If user has disabled offer/session
  if (offer.tempDisable) {
    return next(
      new Error(
        "Counsellor is not accepting Bookings right now. Please check again later."
      )
    );
  }

  //   Initiate Payment
  req.body.price = offer.price;
  const payment = await initiatePayment(req, res, next);
  console.log(payment);

  //   If Order Created on Razorpay
  if (!payment.success) {
    return next(new Error("Some Error Occured in Payment."));
  }

  //   Create Order in DB
  const order = await Order.create({
    user: req.user._id,
    offer: offer._id,
    paymentInfo: { orderId: payment.order.id },
    price: offer.price,
    counsellingDate: req.body.counsellingDate,
  });

  // Send Payment Info
  res.status(200).json(payment);
});

exports.confirmPayment = BigPromise(async (req, res, next) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  //   console.log(razorpay_order_id);
  const test_order = await Order.findOne({
    "paymentInfo.orderId": razorpay_order_id,
  });

  console.log(test_order);
  const order = await Order.findOneAndUpdate(
    {
      "paymentInfo.orderId": razorpay_order_id,
    },
    {
      paymentInfo: {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        status: "Paid",
      },
    }
  );

  res.status(200).json({ success: true, message: "Payment Successfull." });
});
