import React, { useEffect, useState } from "react";
import { editCategory, getCategoriesDetails } from "../../api/categoryApi";
import { Link, useParams, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../api/userApi";
import Swal from "sweetalert2";

const UpdateCategory = () => {
  const [category_name, setCategory_name] = useState("");
  const { token } = isAuthenticated();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getCategoriesDetails(id).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategory_name(data.category_name);
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category_name.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Empty Field",
        text: "Category name cannot be empty.",
        confirmButtonColor: "#6366F1",
      });
      return;
    }

    editCategory(id, category_name, token).then((data) => {
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
          title: "Updated!",
          text: "Category updated successfully.",
          confirmButtonColor: "#22C55E",
        }).then(() => {
          navigate("/admin/category");
        });
      }
    });
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Update Category</h1>
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
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Update Category
        </button>
      </form>
    </div>
  );
};

export default UpdateCategory;
