import React, { useEffect, useState } from "react";
import { getAllCategories, deleteCategory } from "../../api/categoryApi";
import { isAuthenticated } from "../../api/userApi";
import { FiLoader, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = isAuthenticated();
  let [success, setSuccess] = useState(false);

  useEffect(() => {
    getAllCategories().then((data) => {
      if (data.error) {
        console.error(data.error);
        setLoading(false);
      } else {
        setCategories(data);
      }
      setSuccess(false);
      setLoading(false);
    });
  }, [success]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      timer: 2000,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory(id, token).then((data) => {
          if (data.error) {
            Swal.fire("Error", data.error, "error");
          } else {
            Swal.fire("Deleted!", "Category has been deleted.", "success");
            setCategories(categories.filter((category) => category._id !== id));
          }
        });
      }
    });
  };

  return (
    <div className="p-4 md:p-10 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Manage Categories</h1>
        <Link
          to="/admin/category/new"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 md:px-4 py-2 rounded-md shadow transition text-sm md:text-base"
        >
          <FiPlus size={18} />
          <span>Add Category</span>
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center space-x-2 text-gray-500 text-lg">
          <FiLoader className="animate-spin text-indigo-500" size={24} />
          <span>Loading categories...</span>
        </div>
      ) : categories.length === 0 ? (
        <div className="text-gray-500 text-lg bg-gray-50 p-6 rounded border border-gray-200 text-center">
          No categories found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow border border-gray-200">
          <table className="min-w-full text-sm md:text-base">
            <thead className="bg-slate-800 text-white text-left text-xs md:text-sm">
              <tr>
                <th className="py-2 px-3 md:py-3 md:px-6">S.No.</th>
                <th className="py-2 px-3 md:py-3 md:px-6">Category Name</th>
                <th className="py-2 px-3 md:py-3 md:px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {categories.map((cat, i) => (
                <tr key={cat._id} className="border-t hover:bg-slate-50">
                  <td className="py-2 px-3 md:py-3 md:px-6">{i + 1}</td>
                  <td className="py-2 px-3 md:py-3 md:px-6">{cat.category_name}</td>
                  <td className="py-2 px-3 md:py-3 md:px-6">
                    <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                      <Link
                        to={`/admin/category/${cat._id}`}
                        className="flex items-center justify-center gap-1 text-xs sm:text-sm bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                        title="Edit Category"
                      >
                        <FiEdit2 size={16} />
                        <span className="hidden sm:inline">Edit</span>
                      </Link>

                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="flex items-center justify-center gap-1 text-xs sm:text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                        title="Delete Category"
                      >
                        <FiTrash2 size={16} />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
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

export default Category;
