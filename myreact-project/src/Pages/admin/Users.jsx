import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FiEdit, FiLoader, FiPlus, FiUserPlus } from "react-icons/fi";
import { getAllUser, changeRole, verifyuserbyadmin } from "../../api/userApi";
import { isAuthenticated } from "../../api/userApi";

const Users = () => {
  const navigate = useNavigate();
  const { token } = isAuthenticated();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const fetchUsers = () => {
    setLoading(true);
    getAllUser()
      .then((data) => {
        if (data?.error) {
          Swal.fire("Error", data.error, "error");
          setUsers([]);
        } else {
          setUsers(data);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChangeRole = (userId, currentRole) => {
    const newRole = currentRole === 0 ? 1 : 0;
    const roleName = newRole === 1 ? "Admin" : "User";

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change the role to "${roleName}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4F46E5", // Indigo
      cancelButtonColor: "#6B7280", // Gray
      confirmButtonText: `Yes, change to ${roleName}`,
    }).then((result) => {
      if (result.isConfirmed) {
        setActionLoadingId(userId);
        changeRole(userId, newRole, token)
          .then((data) => {
            if (data.error) {
              Swal.fire("Error", data.error, "error");
            } else {
              Swal.fire("Success", "User role updated!", "success");
              fetchUsers();
            }
          })
          .finally(() => setActionLoadingId(null));
      }
    });
  };

  const handleVerifyUser = (userId, isVerified) => {
    if (isVerified) {
      Swal.fire("Info", "User is already verified.", "info");
      return;
    }

    Swal.fire({
      title: "Verify User?",
      text: "Are you sure you want to verify this user?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#22c55e", // green
      cancelButtonColor: "#6B7280", // gray
      confirmButtonText: "Yes, verify user",
    }).then((result) => {
      if (result.isConfirmed) {
        setActionLoadingId(userId);
        verifyuserbyadmin(userId, token)
          .then((data) => {
            if (data.error) {
              Swal.fire("Error", data.error, "error");
            } else {
              Swal.fire("Success", "User verified successfully!", "success");
              fetchUsers();
            }
          })
          .finally(() => setActionLoadingId(null));
      }
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button
          onClick={() => navigate("/admin/addUser")} // or open modal
          className="flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          <FiPlus size={18} />
          <span>Add User</span>
        </button>
      </div>

      {loading ? (
        <div className="flex items-center space-x-2 text-gray-600">
          <FiLoader className="animate-spin" size={24} />
          <span>Loading users...</span>
        </div>
      ) : users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-sm">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="py-2 px-4 border">S.No.</th>
                <th className="py-2 px-4 border">Username</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Role</th>
                <th className="py-2 px-4 border">Verified</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="text-center hover:bg-gray-100 transition"
                >
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{user.username}</td>
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border capitalize">
                    {user.role === 1 ? "Admin" : "User"}
                  </td>
                  <td className="py-2 px-4 border">
                    {user.isVerified ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-red-500 font-medium">No</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border   justify-center">
                    <button
                      onClick={() => handleChangeRole(user._id, user.role)}
                      disabled={actionLoadingId === user._id}
                      className={`text-blue-600 hover:text-blue-800 ${
                        actionLoadingId === user._id
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      title="Change Role"
                      aria-label={`Change role of ${user.username}`}
                    >
                      <FiEdit size={18} />
                    </button>

                    {!user.isVerified && (
                      <button
                        onClick={() =>
                          handleVerifyUser(user._id, user.isVerified)
                        }
                        disabled={actionLoadingId === user._id}
                        className={`px-2 text-green-600 hover:text-green-900 ${
                          actionLoadingId === user._id
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        title="Verify User"
                        aria-label={`Verify ${user.username}`}
                      >
                        <FiUserPlus size={18} />
                      </button>
                    )}
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

export default Users;
