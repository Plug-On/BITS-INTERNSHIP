import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./header";
import Sidebar from "./components/Sidebar";

/*
  Updated Dashboard layout:
  - Header at top (keeps your existing Header import)
  - Left Sidebar (new Sidebar component)
  - Right main content area with the same auth / axios logic you already had
  - Tailwind based dark UI
*/

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
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-center text-gray-400 text-lg">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Keep your existing Header */}
      <Header />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <header className="mb-6">
              <h1 className="text-2xl font-semibold">Events</h1>
            </header>

            <section className="bg-[#111318] rounded-lg p-6 min-h-[70vh] border border-gray-800 shadow-inner">
              {/* thin top divider like screenshot */}
              <div className="border-t border-gray-700 pb-6"></div>

              <div className="mt-6 text-gray-300">
                <div className="w-full max-w-md bg-gray-800 rounded-xl shadow p-6 mx-auto">
                  <h2 className="text-2xl font-bold text-center text-sky-400 mb-4">
                    Welcome
                  </h2>

                  {error && (
                    <p className="text-red-500 text-center mb-4">{error}</p>
                  )}

                  {user && (
                    <div className="bg-sky-900/30 text-sky-200 text-center p-4 rounded-lg mb-6">
                      <p>
                        Hello, <strong className="text-white">{user.name}</strong>!
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </div>

                {/* placeholder content area */}
                <div className="mt-8 grid grid-cols-3 gap-6">
                  <div className="h-28 bg-gray-800 rounded-md"></div>
                  <div className="h-28 bg-gray-800 rounded-md"></div>
                  <div className="h-28 bg-gray-800 rounded-md"></div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;