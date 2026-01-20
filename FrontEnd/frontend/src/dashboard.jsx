import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";

const Dashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/companies");
        setCompanies(res.data);
      } catch (err) {
        console.error("Failed to fetch companies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const totalCompanies = companies.length;
  const activeCompanies = companies.filter(c => c.status === "Active").length;
  const inactiveCompanies = companies.filter(c => c.status === "Inactive").length;

  const today = new Date();
  const isExpiringSoon = (dateStr) => {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    const diff = (date - today) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 7;
  };

  const expiringHosting = companies.filter(c => isExpiringSoon(c.hosting_expiry));
  const expiringDomains = companies.filter(c => isExpiringSoon(c.domain_expiry));

  // Pie chart data
  const chartData = [
    { name: "Active", value: activeCompanies },
    { name: "Inactive", value: inactiveCompanies },
  ];
  const COLORS = ["#38bdf8", "#f87171"]; // Sky blue, Red

  // Simulate Recent Activity from last 5 companies
  // Example: recentActivity array
const recentActivity = companies
  .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
  .slice(0, 5)
  .map(c => {
    const created = new Date(c.created_at);
    const updated = new Date(c.updated_at);

    return {
      id: c.id,
      name: c.name,
      type: updated > created ? "Updated" : "Created",
      date: (updated > created ? updated : created).toLocaleDateString(),
    };
  });




  if (loading) return <p className="text-white p-6">Loading dashboard...</p>;

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <div className="w-64 flex-shrink-0 bg-gray-900">
        <Sidebar />
      </div>

      <div className="flex-1 overflow-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>



        
         {/* Quick Actions / Links */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                <button
                  onClick={() => window.location.href = "/companies/show"}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-semibold transition"
                >
                  View All Companies
                </button>

                <button
                  onClick={() => window.location.href = "/users/show"}
                  className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-semibold transition"
                >
                  View All Users
                </button>

                <button
                  onClick={() => window.location.href = "/companies/create"}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-4 rounded-md font-semibold transition"
                >
                  Add New Company
                </button>

                <button
                  onClick={() => window.location.href = "/users/create"}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-md font-semibold transition"
                >
                  Add New User
                </button>
              </div>




        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card title="Total Companies" value={totalCompanies} icon="🏢" />
          <Card title="Active Companies" value={activeCompanies} icon="🟢" />
          <Card title="Inactive Companies" value={inactiveCompanies} icon="🔴" />
          <Card
            title="Expiring Soon"
            value={expiringHosting.length + expiringDomains.length}
            icon="⏰"
          />
        </div>

        {/* Expiring Tables and Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ExpiringTable title="Hosting Expiring Soon (in 7 days)" data={expiringHosting} type="hosting" />
          <ExpiringTable title="Domains Expiring Soon (in 7 days)" data={expiringDomains} type="domain" />
        </div>

        {/* Chart and Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-4">Company Status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-4">Latest changes</h3>
            <ul className="text-gray-300 space-y-2">
              {recentActivity.map((act) => (
                <li key={act.id} className="border-b border-gray-700 pb-1">
                  <p>
                    <span className="font-semibold">{act.name}</span> {act.type}
                  </p>
                  <p className="text-xs text-gray-400">{act.date}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ====== COMPONENTS ====== */
const Card = ({ title, value, icon }) => (
  <div className="bg-gray-800 rounded-lg p-4 flex items-center gap-4 shadow">
    <div className="text-3xl">{icon}</div>
    <div>
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-white text-xl font-bold">{value}</p>
    </div>
  </div>
);

const ExpiringTable = ({ title, data, type }) => (
  <div className="bg-gray-800 rounded-lg p-4">
    <h3 className="text-white font-semibold mb-3">{title}</h3>
    <table className="w-full text-left text-gray-300 text-sm">
      <thead>
        <tr>
          {type === "hosting" ? (
            <>
              <th>Company</th>
              <th>Plan</th>
              <th>Expiry</th>
              <th>Details</th>
            </>
          ) : (
            <>
              <th>Domain</th>
              <th>Company</th>
              <th>Expiry</th>
              <th>Details</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {data.length ? (
          data.map((c, idx) => (
            <tr key={idx} className="border-t border-gray-700">
              {type === "hosting" ? (
                <>
                  <td>{c.name}</td>
                  <td>{c.hosting}</td>
                  <td className="text-red-400">{c.hosting_expiry}</td>
                   <td>
                      <button
                        onClick={() => window.location.href = `/companies/detail/${c.id}`}
                        className="hover:bg-blue-700 text-white my-1 px-2  rounded text-sm"
                      >
                        View
                      </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{c.domain}</td>
                  <td>{c.name}</td>
                  <td className="text-red-400">{c.domain_expiry}</td>
                  <td>
                      <button
                        onClick={() => window.location.href = `/companies/detail/${c.id}`}
                        className="hover:bg-blue-700 text-white my-1 px-2  rounded text-sm"
                      >
                        View
                      </button>
                  </td>
                </>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3} className="text-gray-500 text-center py-2">
              No data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default Dashboard;
