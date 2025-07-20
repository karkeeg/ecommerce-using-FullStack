import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { API } from "../constants";
import { FaDownload } from "react-icons/fa";
import { SaveShippingInfo } from "../Components/redux/CartActions";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart_items, shipping_info } = useSelector((store) => store.cart);

  const [shipping_Address, setShippingAddress] = useState(
    shipping_info || {
      street: "",
      city: "",
      state: "",
      country: "",
      phone: "",
    }
  );

  const totalPrice = cart_items.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0
  );

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Order Summary", 14, 22);

    const tableColumn = ["Product", "Quantity", "Unit Price", "Subtotal"];
    const tableRows = [];

    cart_items.forEach((item) => {
      tableRows.push([
        item.product_name,
        item.quantity,
        `Rs.${item.product_price.toFixed(2)}`,
        `Rs.${(item.product_price * item.quantity).toFixed(2)}`,
      ]);
    });

    tableRows.push(["", "", "Total", `Rs.${totalPrice.toFixed(2)}`]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("order_summary.pdf");
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    dispatch(SaveShippingInfo(shipping_Address));
  };

  const proceedToPayment = (e) => {
    e.preventDefault();
    sessionStorage.setItem("total", totalPrice);
    navigate("/payment");
  };
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 px-4 py-6 md:px-8 lg:px-16">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
        Checkout
      </h1>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* Table Section */}
        <div className="md:col-span-2 overflow-x-auto bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <table className="min-w-full table-auto border text-sm">
            <thead className="bg-gray-100 text-gray-700 font-semibold">
              <tr>
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Product</th>
                <th className="px-4 py-2 border">Quantity</th>
                <th className="px-4 py-2 border">Unit Price</th>
                <th className="px-4 py-2 border">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart_items.map((item) => (
                <tr key={item.product_id} className="text-gray-600">
                  <td className="border px-4 py-2">
                    <img
                      src={item.product_image}
                      alt={item.product_name}
                      className="w-14 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="border px-4 py-2">{item.product_name}</td>
                  <td className="border px-4 py-2 text-center">
                    {item.quantity}
                  </td>
                  <td className="border px-4 py-2">
                    Rs.{item.product_price.toFixed(2)}
                  </td>
                  <td className="border px-4 py-2 font-medium">
                    Rs.{(item.quantity * item.product_price).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-semibold">
                <td colSpan="4" className="text-right px-4 py-2 border">
                  Total
                </td>
                <td className="px-4 py-2 border text-indigo-600">
                  Rs.{totalPrice.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Shipping Address */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
          {["street", "city", "state", "country", "phone"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium capitalize text-gray-700 mb-1">
                {field === "phone" ? "Phone Number" : field}
              </label>
              <input
                type={field === "phone" ? "tel" : "text"}
                value={shipping_Address[field]}
                onChange={(e) =>
                  setShippingAddress({
                    ...shipping_Address,
                    [field]: e.target.value,
                  })
                }
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <button
            onClick={handleAddressSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
          >
            Save Address
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-7xl mx-auto mt-8 flex flex-col md:flex-row justify-end items-center gap-4">
        <button
          onClick={handleDownloadPDF}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md flex items-center gap-2"
        >
          <FaDownload /> Download PDF
        </button>

        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md"
          onClick={proceedToPayment}
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
