import React, { useEffect, useState } from "react";
import { addProduct } from "../../api/ProductApi";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../api/userApi";
import Swal from "sweetalert2";
import { getAllCategories } from "../../api/categoryApi";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    product_name: "",
    product_price: "",
    product_description: "",
    count_in_stock: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [product_image, setProductImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const { token } = isAuthenticated();

  useEffect(() => {
    getAllCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  }, []);
  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (product_image) formData.append("product_image", product_image);

    addProduct(formData, token).then((data) => {
      if (data.error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error,
          confirmButtonColor: "#EF4444",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product added successfully!",
          confirmButtonColor: "#22C55E",
        });
        setProductData({
          product_name: "",
          product_price: "",
          product_description: "",
          product_rating: "",
          count_in_stock: "",
          category: "",
        });
        setProductImage(null);
        setPreview(null);
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Add New Product</h2>
        <Link
          to="/admin/product"
          className="text-indigo-600 hover:underline font-medium"
        >
          ← Back to Products
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-6 border"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="product_name"
              value={productData.product_name}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Price (in Rs.)
            </label>
            <input
              type="number"
              name="product_price"
              value={productData.product_price}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="1000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Stock Count
            </label>
            <input
              type="number"
              name="count_in_stock"
              value={productData.count_in_stock}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="20"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description
            </label>
            <textarea
              name="product_description"
              value={productData.product_description}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Write something about the product..."
              required
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Category
            </label>
            {/* <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Paste category ID here"
              required
            /> */}
            <select
              name="category"
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              defaultValue={""}
            >
              <option value="" disabled>
                SELECT OPTION
              </option>
              {categories.length > 0 &&
                categories.map((category) => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category.category_name}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Upload Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded-lg p-2"
          />
          {preview && (
            <div className="mt-3">
              <img
                src={preview}
                alt="Preview"
                className="h-40 w-auto rounded-lg border object-cover"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
