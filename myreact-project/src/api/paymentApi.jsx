import { API } from "../constants";

export const getStripeKey = () => {
  return fetch(`${API}/getStripeKey`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const processPayment = (amount, token) => {
  return fetch(`${API}/create-payment-intent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ amount }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
