import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getUserById, updateUser, isAuthenticated } from "../../api/userApi";

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = isAuthenticated();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "1",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserById(id, token)
      .then((data) => {
        if (data.error) {
          Swal.fire("Error", data.error, "error");
          navigate("/users");
        } else {
          setFormData({
            username: data.username,
            email: data.email,
            role: String(data.role),
          });
        }
      })
      .finally(() => setLoading(false));
  }, [id, token, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, role } = formData;

    if (!username || !email) {
      Swal.fire("Warning", "Please fill in all required fields.", "warning");
      return;
    }

    updateUser(id, { username, email, role: Number(role) }, token).then(
      (data) => {
        if (data.error) {
          Swal.fire("Error", data.error, "error");
        } else {
          Swal.fire("Success", "User updated successfully", "success").then(
            () => navigate("/admin/Users")
          );
        }
      }
    );
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading user details...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6">Update User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Username <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Username"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Email"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="0">Admin</option>
            <option value="1">User</option>
          </select>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/admin/Users")}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Update User
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
