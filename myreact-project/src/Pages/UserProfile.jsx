import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../api/userApi";
import { getUserOrders } from "../api/orderApi";
import { FaUserCircle, FaEnvelope, FaUserShield, FaBoxOpen } from "react-icons/fa";
import { MdOutlineAssignment } from "react-icons/md";

const UserProfile = () => {
  const { user, token } = isAuthenticated();
  const [myOrder, setMyOrder] = useState([]);

  useEffect(() => {
    getUserOrders(user._id, token)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setMyOrder(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto text-gray-800">
      {/* User Info */}
      <div className="bg-white border border-gray-200 p-6 rounded shadow mb-8">
        <h1 className="text-3xl font-bold mb-4 flex items-center gap-2 text-blue-700">
          <FaUserCircle /> User Profile
        </h1>
        <p className="mb-2 flex items-center gap-2">
          <FaUserShield className="text-gray-600" />
          <strong>Username:</strong> {user.user}
        </p>
        <p className="mb-2 flex items-center gap-2">
          <FaEnvelope className="text-gray-600" />
          <strong>Email:</strong> {user.email}
        </p>
        <p className="mb-2 flex items-center gap-2">
          <MdOutlineAssignment className="text-gray-600" />
          <strong>Role:</strong> {user.role === 1 ? "Admin" : "User"}
        </p>
      </div>

      {/* Orders */}
      <div className="bg-white border border-gray-200 p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-indigo-600">
          <FaBoxOpen /> My Orders
        </h2>
        {myOrder.length > 0 ? (
          myOrder.map((order) => (
            <div
              key={order._id}
              className="border border-gray-300 rounded-lg mb-6 p-4 bg-gray-50 shadow-sm"
            >
              <div className="mb-2 flex justify-between items-center">
                <h3 className="font-semibold text-lg">Order ID: {order._id}</h3>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusBadgeColor(
                    order.status
                  )}`}
                >
                  {order.status || "Pending"}
                </span>
              </div>
              <p className="mb-2 text-gray-700">
                <strong>Total:</strong> Rs. {order.total}
              </p>

              <p className="mt-4 font-medium text-gray-800 mb-1">Items:</p>
              <ul className="divide-y divide-gray-200">
                {Array.isArray(order.orderItems) ? (
                  order.orderItems.map((item, idx) => (
                    <li key={idx} className="py-2 flex justify-between text-gray-700">
                      <span>
                        {item.product?.product_name || item.name || "Unnamed Product"}
                      </span>
                      <span>Qty: {item.quantity}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No items found.</li>
                )}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
