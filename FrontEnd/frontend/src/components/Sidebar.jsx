
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


/*
  Simple Sidebar component (Tailwind).
  Save this as src/components/Sidebar.jsx and import from Dashboard.
*/

const NavItem = ({ children, active }) => (
  <a
    href="#"
    className={`flex items-center gap-3 px-3 py-2 rounded-md ${
      active ? "bg-gray-800 text-white" : "text-gray-200 hover:bg-gray-800"
    }`}
    aria-current={active ? "page" : undefined}
  >
    <span className="w-5 h-5 text-gray-300">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
        <path d="M4 12h16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
    <span className="font-medium">{children}</span>
  </a>
);

export default function Sidebar() {
  const events = [
    { title: "Bear Hug: Live in Concert", date: "Fri, Feb 12 • 8:00pm" },
    // { title: "Viking People", date: "Sun, Feb 14 • 7:00pm" },
    // { title: "Six Fingers — DJ Set", date: "Sat, Feb 20 • 11:00pm" },
    // { title: "We All Look The Same", date: "Thu, Mar 3 • 9:00pm" },
  ];


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
      navigate("/");
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
    <aside className="w-64 bg-[#0f1720] border-r border-gray-800 flex flex-col">
      {/* Top: logo */}
      <div className="px-4 py-5 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 12c4-4 8-4 12 0s8 4 12 0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="text-lg font-semibold">{user.name}</div>
        <button className="ml-auto text-gray-400 hover:text-gray-200" aria-label="More">
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 8l4 4 4-4" />
          </svg>
        </button>
      </div>

      {/* Nav */}
      <nav className="px-2 py-3 " role="navigation" aria-label="Main navigation">
        {/* <NavItem>Dashboard</NavItem> */}
        <div className="font-bold mx-4"><Link to = "../dashboard">Dashboard</Link></div>
        {/* <NavItem >Users</NavItem> */}
        <div className="font-bold mx-4 mt-3"><Link to = "../users/show">Users</Link></div>
        <div className="font-bold mx-4 mt-3"><Link to = "../companies/show">Companies</Link></div>
        <div className="font-bold mx-4 mt-3"><Link to = "#">Tickets</Link></div>
        <div className="font-bold mx-4 mt-3"><Link to = "#">Settings</Link></div>
        {/* <NavItem>Broadcasts</NavItem>
        <NavItem>Settings</NavItem> */}
      </nav>

      <div className="border-t border-gray-800 mt-3"></div>

      {/* scrollable list */}
      <div className="px-4 py-3 overflow-y-auto sidebar-scroll flex-1">
        <p className="text-sm text-gray-400 uppercase mb-3">Projects</p>

        <ul className="space-y-6">
          {events.map((e, idx) => (
            <li key={idx}>
              <a href="#" className="block text-white font-semibold hover:text-sky-300">
                {e.title}
              </a>
              <div className="text-xs text-gray-400">{e.date}</div>
            </li>
          ))}

          
        </ul>
      </div>

      {/* pinned profile at bottom */}
      <div className="px-auto py-auto border-t border-gray-800">
       
          {/* <div className="flex-1"> */}
            <main className="px-4 py-3 overflow-y-auto sidebar-scroll flex-1">
          <div className="max-w-7xl mx-auto">

              <div className="mt-1 text-gray-300">
                <div className="w-full max-w-md bg-gray-800 rounded-xl shadow p-2 mx-auto">
                  <h2 className="text-2xl font-bold text-center text-sky-400 mb-2">
                    Welcome
                  </h2>

                  {error && (
                    <p className="text-red-500 text-center mb-4">{error}</p>
                  )}

                  {user && (
                    <div className="bg-sky-900/30 text-sky-200 text-center p-2 rounded-lg mb-2">
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

              </div>
            
          </div>
        </main>
          {/* </div> */}
        
      </div>
    </aside>
    
  );
}