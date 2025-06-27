// import { API } from "../constants";

// export const getStripeKey = () => {
//   return fetch(`${API}/getStripeKey`)
//     .then((res) => res.json())
//     .catch((err) => console.log(err));
// };

// export const processPayment = (amount, token) => {
//   return fetch(`${API}/create-payment-intent`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: token,
//     },
//     body: JSON.stringify({ amount }),
//   })
//     .then((res) => res.json())
//     .catch((err) => console.log(err));
// };

import { API } from "../constants";

export const createEsewaPayment = (paymentData) => {
  return fetch(`${API}/esewa/create-payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paymentData),
  }).then((res) => res.json());
};

export const verifyEsewaPayment = (transaction_uuid, amount) => {
  const params = new URLSearchParams({ transaction_uuid, amount });
  return fetch(`${API}/esewa/verify-payment?${params.toString()}`).then((res) =>
    res.json()
  );
};
