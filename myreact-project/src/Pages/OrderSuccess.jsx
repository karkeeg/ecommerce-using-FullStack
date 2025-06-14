import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const OrderSuccess = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 ">
      <div className="bg-white p-8 m-8 rounded-2xl shadow-lg text-center max-w-md w-full">
        <FaCheckCircle className="text-green-500 mx-auto mb-4" size={48} />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Order Placed!
        </h2>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. Thank you for shopping with
          us!
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
