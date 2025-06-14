import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/userApi";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
 

    try {
      const data = await resetPassword(token,  password );
      console.log("Reset Password Data", { password });
      console.log("API Response", data);

      if (data?.error) {
        setError(data.error);
        setSuccess("");
      } else if (data?.message) {
        setSuccess(data.message);
        setError("");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      console.error("API Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Create New Password
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500 text-white rounded">{error}</div>
        )}
        {success && (
          <div className="mb-4 p-3 bg-green-500 text-white rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleReset}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 px-4 py-2 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 px-4 py-2 rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
