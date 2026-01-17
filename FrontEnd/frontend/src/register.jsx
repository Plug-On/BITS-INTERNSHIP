import React, { useState } from "react";
import axios from "axios";
import Header from "./header";
import Footer from "./footer";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
      });

      setSuccess("Registration successful! Please log in.");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.response?.data?.errors) {
        setError(err.response.data.errors.email || "Registration failed");
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-800">
      <Header />

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-gray-200 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {error && (
            <div className="mt-4 text-red-600 text-sm text-center">{error}</div>
          )}

          {success && (
            <div className="mt-4 text-green-600 text-sm text-center">{success}</div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
