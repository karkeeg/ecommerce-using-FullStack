import React, { useEffect, useState } from "react";
import { API } from "../constants";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../Components/redux/store";
import {
  addToCart,
  EmptyCart,
  RemoveFromCart,
  UpdateCart,
} from "../Components/redux/CartActions";
import Swal from "sweetalert2";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Cart = () => {
  // const [cartItems, setCartItems] = useState([]);

  const cartItems = useSelector((store) => store.cart.cart_items);

  const dispatch = useDispatch();

  const increaseQuantity = (item) => {
    let newQty = item.quantity + 1;
    if (newQty > item.count_in_stock) {
      Swal.fire("Warning", "Item Out of Stock", "warning");
    } else {
      let cart_item = { ...item, quantity: newQty };
      dispatch(UpdateCart(cart_item));
    }
  };

  const decreaseQuantity = (item) => {
    let newQty = item.quantity - 1;
    if (newQty == 0) {
      Swal.fire("Warning", "Quantity cannot be less than 1", "warning");
    } else {
      let cart_item = { ...item, quantity: newQty };
      dispatch(UpdateCart(cart_item));
    }
  };

  const handleRemove = (id) => {
    dispatch(RemoveFromCart(id));
  };

  const clearCart = () => {
    dispatch(EmptyCart());
  };

  const navigate = useNavigate();

  const total = cartItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0
  );

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border rounded-lg">
              <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
                <tr>
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-center">Unit Price</th>
                  <th className="p-3 text-center">Quantity</th>
                  <th className="p-3 text-center">Subtotal</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 transition">
                    <td className="p-3">
                      <img
                        src={`${API}/${item.product_image}`}
                        alt={item.product_name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="p-3">{item.product_name}</td>
                    <td className="p-3 text-center text-yellow-400 font-medium">
                      Rs.{item.product_price.toFixed(2)}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => decreaseQuantity(item)}
                          className="border border-gray-300 p-1 rounded hover:bg-gray-200"
                        >
                          <FiMinus />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item)}
                          className="border border-gray-300 p-1 rounded hover:bg-gray-200"
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </td>
                    <td className="p-3 text-center font-semibold text-yellow-500">
                      Rs.{(item.product_price * item.quantity).toFixed(2)}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleRemove(item.product)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 underline text-sm"
            >
              Clear Cart
            </button>

            <div className="text-xl font-bold text-gray-800">
              Total:{" "}
              <span className="text-yellow-500">Rs.{total.toFixed(2)}</span>
            </div>

            <Link
              to={"/checkout"}
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded-xl transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
