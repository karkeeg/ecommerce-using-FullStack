import React, { useEffect, useState } from "react";
import { deleteProduct, getAllProducts } from "../../api/ProductApi";
import { FiEdit2, FiTrash2, FiLoader, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../api/userApi";
import { API } from "../../constants";
import Swal from "sweetalert2";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { token } = isAuthenticated();

  useEffect(() => {
    getAllProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
        setLoading(false);
      } else {
        setProducts(data);
        setLoading(false);
      }
    });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id, token).then((data) => {
          if (data.error) {
            Swal.fire("Error", data.error, "error");
          } else {
            Swal.fire("Deleted!", "Product has been deleted.", "success");
            setProducts(products.filter((product) => product._id !== id));
          }
        });
      }
    });
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">All Products</h1>
        <Link
          to="/admin/addProduct"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 md:px-4 py-2 rounded-md shadow transition text-sm md:text-base"
        >
          <FiPlus size={18} />
          <span>Add Product</span>
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center space-x-2 text-gray-500 text-lg">
          <FiLoader className="animate-spin text-indigo-500" size={24} />
          <span>Loading products...</span>
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <>
          {/* TABLE VIEW - md and above */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow rounded-md text-sm md:text-base">
              <thead className="bg-slate-800 text-white text-xs md:text-sm">
                <tr>
                  <th className="py-2 px-3 md:py-3 md:px-6 text-left">S.No.</th>
                  <th className="py-2 px-3 md:py-3 md:px-6 text-left">Product Image</th>
                  <th className="py-2 px-3 md:py-3 md:px-6 text-left">Product Name</th>
                  <th className="py-2 px-3 md:py-3 md:px-6 text-left">Price</th>
                  <th className="py-2 px-3 md:py-3 md:px-6 text-left">Category</th>
                  <th className="py-2 px-3 md:py-3 md:px-6 text-left">Count in Stocks</th>
                  <th className="py-2 px-3 md:py-3 md:px-6 text-left">Rating</th>
                  <th className="py-2 px-3 md:py-3 md:px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, i) => (
                  <tr key={product._id} className="border-t hover:bg-gray-100">
                    <td className="py-2 px-3 md:py-3 md:px-6">{i + 1}</td>
                    <td className="py-2 px-3 md:py-3 md:px-6">
                      <img
                        src={`${API}/${product.product_image}`}
                        alt={product.product_name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-2 px-3 md:py-3 md:px-6">{product.product_name}</td>
                    <td className="py-2 px-3 md:py-3 md:px-6">Rs.{product.product_price}</td>
                    <td className="py-2 px-3 md:py-3 md:px-6">{product.category?.category_name || "N/A"}</td>
                    <td className="py-2 px-3 md:py-3 md:px-6">{product.count_in_stock}</td>
                    <td className="py-2 px-3 md:py-3 md:px-6">{product.product_rating}</td>
                    <td className="py-2 px-3 md:py-3 md:px-6">
                      <div className="flex space-x-2">
                        <Link to={`/admin/updateProduct/${product._id}`}>
                          <button className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm">
                            <FiEdit2 size={16} />
                            Update
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                        >
                          <FiTrash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CARD / LIST VIEW - below md */}
          <div className="md:hidden space-y-4">
            {products.map((product, i) => (
              <div
                key={product._id}
                className="bg-white shadow rounded-md p-4 border border-gray-200"
              >
                <div className="flex space-x-4">
                  <img
                    src={`${API}/${product.product_image}`}
                    alt={product.product_name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h2 className="font-semibold text-lg text-slate-800">{product.product_name}</h2>
                    <p className="text-sm text-gray-600">Category: {product.category?.category_name || "N/A"}</p>
                    <p className="text-sm text-gray-600">Price: Rs.{product.product_price}</p>
                    <p className="text-sm text-gray-600">Stock: {product.count_in_stock}</p>
                    <p className="text-sm text-gray-600">Rating: {product.product_rating}</p>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2 justify-end">
                  <Link to={`/admin/updateProduct/${product._id}`}>
                    <button className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm">
                      <FiEdit2 size={16} />
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                  >
                    <FiTrash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
