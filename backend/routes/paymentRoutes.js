// const express = require("express");
// const {
//   sendStripeKey,
//   processPayment,
// } = require("../controller/PaymentController");
// const router = express.Router();

// router.get("/getStripeKey", sendStripeKey);
// router.post("/create-payment-intent", processPayment);

// module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createPayment,
  verifyPayment,
} = require("../controller/PaymentController");
const {
  EsewaInitiatePayment,
  paymentStatus,
} = require("../controller/EsewaController");
const { isloggedIn } = require("../controller/userController");

router.post("/esewa/create-payment", createPayment);
router.get("/esewa/verify-payment", verifyPayment);

router.post("/initiate-payment", EsewaInitiatePayment);
router.post("/payment-status", paymentStatus);

module.exports = router;
