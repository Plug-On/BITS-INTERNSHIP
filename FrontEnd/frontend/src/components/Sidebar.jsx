import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";

export default function Sidebar() {
  const [user, setUser] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  // const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);


  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (userData && token) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
       
      } catch {
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
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/");
    } catch {
      toast.setError("Failed to log out.");
    }
    finally {
      setLogoutConfirmOpen(false);
    }

  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-gray-400 text-lg">Loading...</p>
      </div>
    );

  // Avatar with initials
  const Avatar = ({ name }) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    return (
      <div className="w-10 h-10 rounded-full bg-gray-600 text-white flex items-center justify-center font-bold text-sm">
        {initials}
      </div>
    );
  };

  // Sample events
  const events = [
    { title: "Bear Hug: Live in Concert", date: "Fri, Feb 12 • 8:00pm" },
  ];

  return (
    <aside className="w-64 bg-[#0f1720] border-r border-gray-800 flex flex-col min-h-screen">
      {/* User profile */}
      <div className="relative px-4 py-5" ref={dropdownRef}>
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="flex items-center gap-2 w-full focus:outline-none"
        >
          <Avatar name={user?.name || "User"} />
          <span className="text-white font-semibold truncate">{user?.name}</span>
          <svg
            className={`w-4 h-4 ml-auto text-gray-400 transition-transform ${
              profileOpen ? "rotate-180" : ""
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M6 8l4 4 4-4" />
          </svg>
        </button>

        {/* Dropdown */}
        {profileOpen && (
          <div className="absolute top-full left-0 w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-700">
              <Avatar name={user?.name} />
              <span className="text-white font-medium truncate">{user?.name}</span>
            </div>
            <button
              onClick={setLogoutConfirmOpen}
              className="w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white text-red-500 font-semibold rounded-b-md"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="px-2 py-3 flex-shrink-0">
        <div className="font-bold mx-4">
          <Link to="../dashboard">Dashboard</Link>
        </div>
        <div className="font-bold mx-4 mt-3">
          <Link to="../users/show">Users</Link>
        </div>
        <div className="font-bold mx-4 mt-3">
          <Link to="../companies/show">Companies</Link>
        </div>
        <div className="font-bold mx-4 mt-3">
          <Link to="#">Tickets</Link>
        </div>
        <div className="font-bold mx-4 mt-3">
          <Link to="#">Settings</Link>
        </div>
      </nav>

      {/* Scrollable sidebar events */}
      <div className="px-4 py-3 flex-1 overflow-y-auto sidebar-scroll">
        <p className="text-sm text-gray-400 uppercase mb-3">Projects</p>
        <ul className="space-y-4">
          {events.map((e, idx) => (
            <li key={idx}>
              <a
                href="#"
                className="block text-white font-semibold hover:text-sky-300 truncate"
              >
                {e.title}
              </a>
              <div className="text-xs text-gray-400">{e.date}</div>
            </li>
          ))}
        </ul>
      </div>
      <ConfirmModal
  open={logoutConfirmOpen}
  title="Confirm Logout"
  message="Are you sure you want to log out?"
  onConfirm={handleLogout}
  onCancel={() => setLogoutConfirmOpen(false)}
/>

    </aside>
  );
}
