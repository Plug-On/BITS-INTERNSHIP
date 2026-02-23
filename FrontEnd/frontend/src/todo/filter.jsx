import React from "react";

const Filter = ({
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="mb-6 space-y-4">

      {/* Priority Filter */}
      <div>
        <p className="text-gray-400 text-sm mb-2">Filter by Priority</p>
        <div className="flex flex-wrap gap-3">
          {["all", "high", "medium", "low"].map((item) => (
            <button
              key={item}
              onClick={() => setPriorityFilter(item)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                priorityFilter === item
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Status Filter */}
      <div>
        <p className="text-gray-400 text-sm mb-2">Filter by Status</p>
        <div className="flex flex-wrap gap-3">
          {["all", "pending", "in_progress", "completed"].map((item) => (
            <button
              key={item}
              onClick={() => setStatusFilter(item)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                statusFilter === item
                  ? "bg-green-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {item === "in_progress"
                ? "In Progress"
                : item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ NEW: Sort Section (Same Button Style) */}
      <div>
        <p className="text-gray-400 text-sm mb-2">Sort</p>
        <div className="flex flex-wrap gap-3">
          {["newest", "oldest"].map((item) => (
            <button
              key={item}
              onClick={() => setSortOrder(item)}
              className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                sortOrder === item
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