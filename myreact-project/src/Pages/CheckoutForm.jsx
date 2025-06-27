// import {
//   useStripe,
//   useElements,
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
// } from "@stripe/react-stripe-js";
// import { processPayment } from "../api/paymentApi";
// import { useEffect, useState } from "react";
// import { isAuthenticated } from "../api/userApi";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { placeOrder } from "../api/orderApi";
// import Swal from "sweetalert2";
// import { EmptyCart } from "../Components/redux/CartActions";

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   let [loading, setLoading] = useState(false);

//   let [message, setMessage] = useState("");
//   let { cart_items, shipping_info } = useSelector((store) => store.cart);

//   const ELEMENT_OPTIONS = {
//     style: {
//       base: {
//         fontSize: "16px",
//         color: "#32325d",
//         letterSpacing: "0.025em",
//         fontFamily: "Arial, sans-serif",
//         "::placeholder": {
//           color: "#a0aec0",
//         },
//       },
//       invalid: {
//         color: "#fa755a",
//       },
//     },
//   };

//   const dispatch = useDispatch();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     let { token, user } = isAuthenticated();
//     let amount = sessionStorage.getItem("total");
//     console.log(amount);
//     processPayment(amount, token).then((data) => {
//       if (data.error) {
//         console.log(data.error);
//       } else {
//         stripe
//           .confirmCardPayment(data.clientSecret, {
//             payment_method: {
//               card: elements.getElement(
//                 CardNumberElement,
//                 CardCvcElement,
//                 CardExpiryElement
//               ),
//             },
//           })
//           .then((result) => {
//             setLoading(false);
//             if (result.error) {
//               setMessage(result.error.message);
//             } else if (result.paymentIntent.status === "succeeded") {
//               setMessage("Payment successful!");
//               //place order
//               let order = {
//                 orderItems: cart_items,
//                 ...shipping_info,
//                 user: user._id,
//               };

//               placeOrder(order, token).then((data) => {
//                 if (data.error) {
//                   Swal.fire("Error", data.error, "error");
//                 } else {
//                   // Swal.fire("Success", "Order placed successfully!", "success");
//                   dispatch(EmptyCart());
//                   navigate("/orderSuccess");
//                 }
//               });
//               //remove cart items
//               //navigate to order success page
//             }
//           });
//       }
//     });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       style={{ maxWidth: 400, margin: "0 auto" }}
//       className="p-10 m-5 shadow-lg"
//     >
//       <div style={{ marginBottom: "20px" }}>
//         <label>Card Number</label>
//         <div
//           style={{
//             border: "1px solid #ccc",
//             padding: "10px",
//             borderRadius: "5px",
//             marginTop: "5px",
//           }}
//         >
//           <CardNumberElement options={ELEMENT_OPTIONS} />
//         </div>
//       </div>

//       <div style={{ marginBottom: "20px" }}>
//         <label>Expiry</label>
//         <div
//           style={{
//             border: "1px solid #ccc",
//             padding: "10px",
//             borderRadius: "5px",
//             marginTop: "5px",
//           }}
//         >
//           <CardExpiryElement options={ELEMENT_OPTIONS} />
//         </div>
//       </div>

//       <div style={{ marginBottom: "20px" }}>
//         <label>CVC</label>
//         <div
//           style={{
//             border: "1px solid #ccc",
//             padding: "10px",
//             borderRadius: "5px",
//             marginTop: "5px",
//           }}
//         >
//           <CardCvcElement options={ELEMENT_OPTIONS} />
//         </div>
//       </div>
//       {/* <CardElement options={ELEMENT_OPTIONS}/> */}

//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         style={{
//           width: "100%",
//           padding: "12px",
//           backgroundColor: "#6772e5",
//           color: "#fff",
//           fontSize: "16px",
//           borderRadius: "5px",
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         {!stripe || loading ? "Loading" : "Pay Now"}
//       </button>

//       {message && (
//         <p style={{ marginTop: "20px", color: "green", textAlign: "center" }}>
//           {message}
//         </p>
//       )}
//     </form>
//   );
// };

// export default CheckoutForm;

import React from "react";
import { createEsewaPayment } from "../api/paymentApi";

const CheckoutForm = () => {
  const payWithEsewa = async (e) => {
    e.preventDefault();

    const totalAmount = sessionStorage.getItem("total");
    const transaction_uuid = `${Date.now()}`;

    // Save to sessionStorage for use in OrderSuccess page
    sessionStorage.setItem("esewa_transaction_uuid", transaction_uuid);
    sessionStorage.setItem("esewa_amount", totalAmount);

    // Payment data to send to backend
    const paymentData = {
      total_amount: totalAmount,
      transaction_uuid,
    };

    try {
      const data = await createEsewaPayment(paymentData);

      if (data.error) {
        alert(data.error);
        return;
      }

      // Dynamically create and submit form to eSewa
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
      form.style.display = "none";

      Object.entries(data).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error("Payment creation error:", err);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <div className="p-5 border shadow-md max-w-md mx-auto mt-10">
      <h2 className="text-xl font-semibold mb-4">Pay with eSewa</h2>
      <button
        onClick={payWithEsewa}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
      >
        Pay with eSewa
      </button>
    </div>
  );
};

export default CheckoutForm;
