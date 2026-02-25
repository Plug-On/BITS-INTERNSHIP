import React from "react";

const Filter = ({
  statusFilter,
  setStatusFilter,
  hostingFilter,
  setHostingFilter,
  expiryFilter,
  setExpiryFilter,
  sortOption,
  setSortOption,
}) => {
  return (
    <div className="mb-6 space-y-4">

      {/* Status Filter */}
      <div>
        <p className="text-gray-400 text-sm mb-2">Filter by Status</p>
        <div className="flex flex-wrap gap-3">
          {["All", "Active", "Inactive"].map((item) => (
            <button
              key={item}
              onClick={() => setStatusFilter(item)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                statusFilter === item
                  ? "bg-green-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Hosting Filter */}
      <div>
        <p className="text-gray-400 text-sm mb-2">Filter by Hosting</p>
        <div className="flex flex-wrap gap-3">
          {["All", "Single", "Shared"].map((item) => (
            <button
              key={item}
              onClick={() => setHostingFilter(item)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                hostingFilter === item
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Expiry Filter */}
      <div>
        <p className="text-gray-400 text-sm mb-2">Filter by Expiry</p>
        <div className="flex flex-wrap gap-3">
          {[
            { key: "All", label: "All" },
            { key: "domain", label: "Expired Domain" },
            { key: "hosting", label: "Expired Hosting" },
            { key: "both", label: "Expired Both" },
            { key: "expiring_domain", label: "Domain Soon" },
            { key: "expiring_hosting", label: "Hosting Soon" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setExpiryFilter(item.key)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                expiryFilter === item.key
                  ? "bg-red-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

          



      {/* Sort Section */}
      <div>
        <p className="text-gray-400 text-sm mb-2">Sort</p>
        <div className="flex flex-wrap gap-3">
          {["newest", "oldest"].map((item) => (
            <button
              key={item}
              onClick={() => setSortOption(item)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                sortOption === item
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Filter;