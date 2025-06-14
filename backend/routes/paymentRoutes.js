const express = require("express");
const {
  sendStripeKey,
  processPayment,
} = require("../controller/PaymentController");
const router = express.Router();

router.get("/getStripeKey", sendStripeKey);
router.post("/create-payment-intent", processPayment);

module.exports = router;
