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

export const createEsewaPayment = (paymentData, token) => {
  return fetch(`${API}/esewa/create-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: token }),
    },
    body: JSON.stringify(paymentData),
  }).then((res) => res.json());
};

export const verifyEsewaPayment = (transaction_uuid, amount, token) => {
  const params = new URLSearchParams({ transaction_uuid, amount });
  return fetch(`${API}/esewa/verify-payment?${params.toString()}`, {
    method: "GET",
    headers: {
      ...(token && { Authorization: token }),
    },
  }).then((res) => res.json());
};
