// src/pages/AddOrder.jsx
import React, { useState } from "react";
import { addneworder } from "../../api/orderApi";
import { isAuthenticated } from "../../api/userApi";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddOrder = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    total: "",
  });

  const navigate = useNavigate();
  const { token } = isAuthenticated();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newOrder = {
      user: {
        username: form.username,
        email: form.email,
      },
      phone: form.phone,
      street: form.street,
      city: form.city,
      total: parseFloat(form.total),
      orderItems: [],
      status: "pending",
    };

    const res = await addneworder(newOrder, token);
    if (res.error) {
      Swal.fire("Error", res.error, "error");
    } else {
      Swal.fire("Success", "Order added!", "success").then(() => {
        navigate("/admin/orders");
      });
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Order</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded grid grid-cols-1 gap-4"
      >
        {["username", "email", "phone", "street", "city", "total"].map(
          (field) => (
            <input
              key={field}
              type={field === "total" ? "number" : "text"}
              placeholder={field[0].toUpperCase() + field.slice(1)}
              className="border border-gray-300 rounded px-3 py-2"
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              required
            />
          )
        )}

        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            <FiCheckCircle /> Submit
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/orders")}
            className="flex items-center gap-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            <FiXCircle /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOrder;
