import React, { useState } from "react";
import { addCategory } from "../../api/categoryApi";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../api/userApi";
import Swal from "sweetalert2"; // Import SweetAlert2

const AddCategory = () => {
  const [category_name, setCategory_name] = useState("");
  const { token } = isAuthenticated();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category_name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Empty Field",
        text: "Category name cannot be empty.",
        confirmButtonColor: "#6366F1", // Tailwind indigo-500
      });
      return;
    }

    addCategory(category_name, token).then((data) => {
      if (data.error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.error,
          confirmButtonColor: "#EF4444", // red-500
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Category added successfully!",
          confirmButtonColor: "#22C55E", // green-500
        });
        setCategory_name(""); // Reset form
      }
    });
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Category</h1>
      <Link to="/admin/category" className="text-blue-500 mb-4 inline-block">
        ← Back to Categories
      </Link>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="category_name"
          placeholder="Enter category name"
          value={category_name}
          onChange={(e) => setCategory_name(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
