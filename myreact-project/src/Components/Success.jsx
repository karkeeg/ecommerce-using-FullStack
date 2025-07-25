import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { verifyEsewaPayment } from "../api/paymentApi";
import { placeOrder } from "../api/orderApi";
import { EmptyCart } from "../Components/redux/CartActions";
import { isAuthenticated } from "../api/userApi";

const OrderSuccess = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  const cart = useSelector((state) => state.cart?.cart_items || []);

  useEffect(() => {
    const handlePayment = async () => {
      const params = new URLSearchParams(location.search);
      const transaction_uuid = params.get("transaction_uuid");
      const rawAmount = params.get("amount");

      if (!transaction_uuid || !rawAmount) {
        setStatus("invalid");
        return;
      }

      const [amount] = rawAmount.split("?");
      console.log("Parsed amount:", amount);
      console.log("transaction_uuid:", transaction_uuid);

      // Always get user and token from isAuthenticated (localStorage)
      const { user, token } = isAuthenticated() || {};

      // Pass token to verifyEsewaPayment
      const verifyRes = await verifyEsewaPayment(
        transaction_uuid,
        amount,
        token
      );

      if (verifyRes.success && user && token) {
        // 1. Place the order
        const orderData = {
          user: user._id,
          items: cart,
          totalAmount: parseFloat(amount),
          paymentMethod: "eSewa",
          transactionId: transaction_uuid,
        };

        const res = await placeOrder(orderData, token);

        if (res.success) {
          // 2. Empty cart
          dispatch(EmptyCart());

          setStatus("Success");
        } else {
          setStatus("order-failed");
        }
      } else {
        setStatus("verify-failed");
      }

      setLoading(false);
    };

    handlePayment();
  }, [location, dispatch, cart]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <div className="loader mb-4"></div>
        <p className="text-lg font-medium">Verifying your payment...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      {status === "Success" && (
        <>
          <h2 className="text-2xl font-semibold text-green-600 mb-2">
            🎉 Payment Verified!
          </h2>
          <p className="mb-4 text-gray-700">
            Your order has been placed successfully.
          </p>
          <Link
            to="/"
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Go to Homepage
          </Link>
        </>
      )}

      {status === "verify-failed" && (
        <p className="text-red-600 text-lg">
          ❌ Payment verification failed. Please contact support.
        </p>
      )}

      {status === "order-failed" && (
        <p className="text-red-600 text-lg">
          ❌ Payment verified, but order could not be placed.
        </p>
      )}

      {status === "invalid" && (
        <p className="text-yellow-600 text-lg">⚠️ Invalid payment response.</p>
      )}
    </div>
  );
};

export default OrderSuccess;
