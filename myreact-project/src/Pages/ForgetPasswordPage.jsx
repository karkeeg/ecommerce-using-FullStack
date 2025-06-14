import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { forgetPassword } from "../api/userApi";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [resetEmail, setResetEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!resetEmail) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      setError("Email is invalid");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    if (!validate()) return;

    setLoading(true);
    //   Simulate API call
    setTimeout(() => {
      setLoading(false);
    //   setSuccess("Password reset link sent to your email.");
      setResetEmail("");
    }, 2000);

    try {
      forgetPassword(resetEmail)
        .then((data) => {
          console.log("API Response:", data);
          if (data?.error) {
            setError(data.error);
            setSuccess("");
          }
          if (data?.message) {
            setSuccess(data.message);
            setResetEmail("");
            setError("");}
        })
        .catch((err) => {
          console.log("API Error:", err);
          setError("Something went wrong. Please try again.");
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Reset Password
        </h2>

        {error && (
          <div className="w-full mb-4 p-4 text-white bg-red-500 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="w-full mb-4 p-4 text-white bg-green-500 rounded">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-1">
              Enter your email address
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <FaEnvelope className="text-indigo-500 mr-2" />
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full outline-none"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-800 font-medium text-sm"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md ${
                loading ? "opacity-60" : ""
              }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
