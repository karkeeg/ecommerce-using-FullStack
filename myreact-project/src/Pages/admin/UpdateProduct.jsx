import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../api/userApi";
import Swal from "sweetalert2";
import { editProduct, getProductDetails } from "../../api/ProductApi";
import { getAllCategories } from "../../api/categoryApi";
import { API } from "../../constants";

const UpdateProduct = () => {
  const [formData, setFormData] = useState({
    product_name: "",
    product_price: "",
    product_description: "",
    count_in_stock: "",
    category: "",
    product_image: "",
  });

  const [categories, setCategories] = useState([]);
  const [product_image, setProductImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const { token } = isAuthenticated();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails(id).then((data) => {
      if (!data?.error) {
        setFormData({
          product_name: data.product_name || "",
          product_price: data.product_price || "",
          count_in_stock: data.count_in_stock || "",
          category: data.category?._id || "",
        });
        setPreviewImage(data.product_image);
      } else {
        console.error(data.error);
      }
    });

    getAllCategories().then((data) => {
      if (!data?.error) {
        setCategories(data);
      } else {
        console.error(data.error);
      }
    });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { product_name, product_price, count_in_stock, category } = formData;

    if (!product_name || !product_price || !count_in_stock || !category) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in all fields.",
        confirmButtonColor: "#6366F1",
      });
      return;
    }

    const updatedFormData = new FormData();
    updatedFormData.append("product_name", product_name);
    updatedFormData.append("product_price", product_price);
    updatedFormData.append("count_in_stock", count_in_stock);
    updatedFormData.append("category", category);
    if (product_image) {
      updatedFormData.append("product_image", product_image);
    }

    editProduct(id, updatedFormData, token).then((data) => {
      if (data?.error) {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: data.error,
          confirmButtonColor: "#EF4444",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Product Updated",
          text: "The product was successfully updated.",
          confirmButtonColor: "#22C55E",
        }).then(() => {
          navigate("/admin/product");
        });
      }
    });
  };

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Update Product
      </h1>
      <Link
        to="/admin/product"
        className="text-indigo-600 hover:underline text-sm mb-6 inline-block"
      >
        ← Back to Products
      </Link>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product Name */}
        <div>
          <label
            htmlFor="product_name"
            className="block font-medium text-gray-700 mb-1"
          >
            Product Name
          </label>
          <input
            id="product_name"
            name="product_name"
            type="text"
            value={formData.product_name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Product Price */}
        <div>
          <label
            htmlFor="product_price"
            className="block font-medium text-gray-700 mb-1"
          >
            Product Price
          </label>
          <input
            id="product_price"
            name="product_price"
            type="number"
            value={formData.product_price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Count In Stock */}
        <div>
          <label
            htmlFor="count_in_stock"
            className="block font-medium text-gray-700 mb-1"
          >
            Count in Stock
          </label>
          <input
            id="count_in_stock"
            name="count_in_stock"
            type="number"
            value={formData.count_in_stock}
            onChange={handleChange}
            placeholder="Enter available quantity"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>
              SELECT CATEGORY
            </option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>

        {/* Product Image */}
        <div>
          <img src={formData.product_image} alt="" />
          <label className="block font-medium text-gray-700 mb-1">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm text-gray-500"
          />
          {previewImage && (
            <div className="mt-3">
              <img
                src={previewImage}
                alt="Preview"
                className="h-40 w-auto rounded-lg border object-cover"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
