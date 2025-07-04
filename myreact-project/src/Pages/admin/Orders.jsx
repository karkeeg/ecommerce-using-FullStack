import React, { useEffect, useState } from "react";
import {
  getAllOrders,
  updateOrderStatus,
  addneworder,
  deleteOrder, // Import deleteOrder API call
} from "../../api/orderApi";
import { isAuthenticated } from "../../api/userApi";
import {
  FiLoader,
  FiPlus,
  FiCheckCircle,
  FiXCircle,
  FiRefreshCcw,
  FiDelete,
} from "react-icons/fi";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { MdDelete, MdDeleteForever } from "react-icons/md";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [newOrder, setNewOrder] = useState({
    username: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    total: "",
  });

  const { token } = isAuthenticated();

  useEffect(() => {
    getAllOrders()
      .then((data) => {
        if (data.error) {
          console.log(data.error);
          Swal.fire("Error", data.error, "error");
        } else {
          setOrders(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error", "Failed to fetch orders", "error");
        setLoading(false);
      });
  }, [loading]);

  const handleAddOrder = async (e) => {
    e.preventDefault();

    const res = await addneworder(newOrder, token);
    if (res.error) {
      Swal.fire("Error", res.error, "error");
    } else {
      Swal.fire("Success", "Order added!", "success");
      setOrders([...orders, res.order || newOrder]);
      setShowForm(false);
      setNewOrder({
        username: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        total: "",
      });
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const res = await updateOrderStatus(orderId, newStatus, token);
      if (res.error) {
        Swal.fire("Error", res.error, "error");
      } else {
        Swal.fire("Success", `Status updated to ${newStatus}`, "success");
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  // New: Handle deleting an order with confirmation
  const handleDeleteOrder = async (orderId) => {
    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmResult.isConfirmed) {
      const res = await deleteOrder(orderId, token);
      if (res.error) {
        Swal.fire("Error", res.error, "error");
      } else {
        Swal.fire("Deleted!", "Order has been deleted.", "success");
        // Remove deleted order from state
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Orders</h2>
      </div>

      {loading ? (
        <div className="flex items-center space-x-2 text-gray-600">
          <FiLoader className="animate-spin" size={24} />
          <span>Loading orders...</span>
        </div>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="py-2 px-4 border">S.N</th>
                <th className="py-2 px-4 border">Customer</th>
                <th className="py-2 px-4 border">Order ID</th>
                <th className="py-2 px-4 border">Details</th>
                <th className="py-2 px-4 border">Total</th>
                <th className="py-2 px-4 border">Current Status</th>
                <th className="py-2 px-4 border">Actions</th>
                <th className="py-2 px-4 border">
                  <MdDeleteForever />
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr
                  key={order._id || i}
                  className="text-center hover:bg-gray-50"
                >
                  <td className="py-2 px-4 border">{i + 1}</td>
                  <td className="py-2 px-4 border">
                    {order?.user?.username || order?.username || "Unknown"}
                  </td>
                  <td className="py-2 px-4 border">{order?._id}</td>
                  <td className="py-2 px-4 border">
                    <Link to={`/admin/order/${order._id}`}>
                      <button className="text-blue-600 hover:underline">
                        View Details
                      </button>
                    </Link>
                  </td>
                  <td className="py-2 px-4 border">Rs. {order.total}</td>
                  <td className="py-2 px-4 border">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border space-y-1 flex flex-col gap-1">
                    {["Pending", "Delivered", "Cancelled"].map(
                      (statusOption) => {
                        const isActive = order.status === statusOption;

                        const buttonClasses = {
                          Pending: isActive
                            ? "bg-yellow-500 text-white"
                            : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
                          Delivered: isActive
                            ? "bg-green-600 text-white"
                            : "bg-green-100 text-green-700 hover:bg-green-200",
                          Cancelled: isActive
                            ? "bg-red-600 text-white"
                            : "bg-red-100 text-red-700 hover:bg-red-200",
                        };

                        const getIcon = () => {
                          switch (statusOption) {
                            case "Pending":
                              return <FiRefreshCcw />;
                            case "Delivered":
                              return <FiCheckCircle />;
                            case "Cancelled":
                              return <FiXCircle />;
                            default:
                              return null;
                          }
                        };

                        return (
                          <button
                            key={statusOption}
                            className={`w-full flex items-center justify-center gap-1 px-2 py-1 rounded transition duration-200 ${
                              buttonClasses[statusOption]
                            } ${
                              isActive ? "cursor-not-allowed opacity-90" : ""
                            }`}
                            disabled={isActive}
                            onClick={() =>
                              !isActive &&
                              handleStatusUpdate(order._id, statusOption)
                            }
                          >
                            {getIcon()} {statusOption}
                          </button>
                        );
                      }
                    )}
                  </td>
                  <td className="py-2 px-4 border">
                    {/* Delete Button */}
                    <button
                      className="text-red-600 hover:text-red-800 transition duration-200"
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      <MdDelete size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
