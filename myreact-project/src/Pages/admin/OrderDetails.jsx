import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../api/orderApi"; // your fetch helper
import { FiLoader } from "react-icons/fi";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getOrderById(id)
      .then((data) => {
        setOrder(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 text-gray-600">
        <FiLoader className="animate-spin mr-2" size={24} />
        Loading order details...
      </div>
    );
  }

  if (!order || !order._id) {
    return <p className="text-center text-red-600 py-10">Order not found.</p>;
  }

  const {
    user,
    orderItems,
    total,
    street,
    city,
    state,
    country,
    phone,
    status,
    createdAt,
    updatedAt,
  } = order;

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-md">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Order Details</h1>

      {/* Customer Info */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-indigo-300 pb-2 mb-4">
          Customer Info
        </h2>
        <p>
          <span className="font-semibold">Name:</span> {user?.username || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user?.email || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {phone || "N/A"}
        </p>
      </section>

      {/* Shipping Address */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-indigo-300 pb-2 mb-4">
          Shipping Address
        </h2>
        <p>{street}</p>
        <p>
          {city}, {state}, {country}
        </p>
      </section>

      {/* Order Items */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-indigo-300 pb-2 mb-4">
          Ordered Items
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-md">
            <thead className="bg-indigo-100 text-indigo-800">
              <tr>
                <th className="py-2 px-4 border">#</th>
                <th className="py-2 px-4 border">Product</th>
                <th className="py-2 px-4 border">Qty</th>
                <th className="py-2 px-4 border">Unit Price (Rs.)</th>
                <th className="py-2 px-4 border">Subtotal (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item, i) => (
                <tr
                  key={item._id}
                  className={i % 2 === 0 ? "bg-white" : "bg-indigo-50"}
                >
                  <td className="py-2 px-4 border text-center">{i + 1}</td>
                  <td className="py-2 px-4 border">
                    {item.product.product_name}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {item.quantity}
                  </td>
                  <td className="py-2 px-4 border text-right">
                    {item.product.product_price.toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border text-right">
                    {(
                      item.product.product_price * item.quantity
                    ).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Summary */}
      <section className="mb-6 text-right">
        <p className="text-lg font-semibold">
          Total: Rs. {total.toLocaleString()}
        </p>
      </section>

      {/* Status & Dates */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold border-b border-indigo-300 pb-2 mb-4">
          Order Status & Info
        </h2>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`font-bold px-2 py-1 rounded text-white ${
              status === "Pending"
                ? "bg-yellow-500"
                : status === "Delivered"
                ? "bg-green-600"
                : status === "Cancelled"
                ? "bg-red-600"
                : "bg-gray-500"
            }`}
          >
            {status}
          </span>
        </p>
        <p>
          <span className="font-semibold">Created At:</span>{" "}
          {formatDate(createdAt)}
        </p>
        <p>
          <span className="font-semibold">Last Updated:</span>{" "}
          {formatDate(updatedAt)}
        </p>
      </section>
    </div>
  );
};

export default OrderDetails;
