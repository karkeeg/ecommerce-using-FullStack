const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.sendStripeKey = (req, res) => {
  res.send({ stripeApiKey: process.env.STRIPE_API_KEY });
};

exports.processPayment = async (req, res) => {
  const { amount } = req.body;

  const paymentIntent = await Stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "npr",
    payment_method_types: ["card"],
  });

  if (!paymentIntent) {
    return res.status(400).json({ error: "Something went wrong" });
  }

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};
