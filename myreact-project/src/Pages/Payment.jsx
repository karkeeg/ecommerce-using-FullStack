import React, { useEffect, useState } from "react";
import { getStripeKey } from "../api/paymentApi";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {
  let [stripeAPI, setStripeAPI] = useState("");

  useEffect(() => {
    getStripeKey()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setStripeAPI(data.stripeApiKey);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <Elements stripe={loadStripe(stripeAPI)}>
        <CheckoutForm />
      </Elements>
    </>
  );
};

export default Payment;
