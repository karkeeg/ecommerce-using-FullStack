import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { register } from "../api/userApi";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
        
  const handleSubmit = (e) => {
    e.preventDefault();

    register(formData)
      .then((data) => {
        console.log("API Response:", data);

        if (data?.error) {
          setError(data.error);
          setSuccess(false);
        } else {
          setSuccess(true);
          setError("");
          setFormData({ username: "", email: "", password: "" });
        }
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
        setSuccess(false);
      });
  };

  return (
    <div className="min-h-screen bg-slate-100 from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Register
        </h2>

        {success && (
          <div className="w-full p-4 mb-4 text-white bg-green-500 rounded">
            User registered successfully! Go to{" "}
            <Link to="/login" className="text-red-300 font-mono text-2xl">
              Login
            </Link>
          </div>
        )}

        {error && (
          <div className="w-full p-4 mb-4 text-white bg-red-500 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
              <FaUser className="text-indigo-500 mr-2" />
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-semibold mb-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
              <FaEnvelope className="text-indigo-500 mr-2" />
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              className="block text-gray-700 font-semibold mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
              <FaLock className="text-indigo-500 mr-2" />
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md shadow transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
