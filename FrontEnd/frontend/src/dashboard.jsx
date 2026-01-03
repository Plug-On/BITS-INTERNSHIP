import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (userData && token) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);

        axios
          .get("http://127.0.0.1:8000/api/dashboard", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            console.log("Dashboard data:", response.data);
          })
          .catch((error) => {
            setError("Failed to fetch dashboard data.");
            console.error(error);
          });
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("user");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      setError("Failed to log out.");
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-500 text-lg mt-10">Loading...</p>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Welcome to Your Dashboard
        </h2>

        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}

        {user && (
          <div className="bg-blue-100 text-blue-800 text-center p-4 rounded-lg mb-6">
            <p>
              Hello, <strong>{user.name}</strong>!
            </p>
            <p>Your email: {user.email}</p>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
