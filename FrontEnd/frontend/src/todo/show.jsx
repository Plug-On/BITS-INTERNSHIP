import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import ConfirmModal from "../components/ConfirmModal";
import { toast } from "react-hot-toast";
import Filter from "./filter";
import { FiFilter,FiChevronDown, FiChevronUp, FiCheckSquare } from "react-icons/fi";

const Show = () => {
  const [todos, setTodos] = useState([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/todo")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const openDeleteConfirm = (id) => {
    setSelectedTodoId(id);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todo/${selectedTodoId}`);
      setTodos((prev) => prev.filter((t) => t.id !== selectedTodoId));
      toast.success("Todo deleted successfully");
    } catch (error) {
      toast.error("Failed to delete todo");
    } finally {
      setDeleteConfirmOpen(false);
      setSelectedTodoId(null);
    }
  };

  /* ================= FILTER + SEARCH + SORT ================= */

  const filteredTodos = todos
    .filter((todo) => {
      const searchMatch =
        `${todo.title} ${todo.description}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const priorityMatch =
        priorityFilter === "all" || todo.priority === priorityFilter;

      const statusMatch =
        statusFilter === "all" || todo.status === statusFilter;

      return searchMatch && priorityMatch && statusMatch;
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return b.id - a.id;
      } else {
        return a.id - b.id;
      }
    });

  const clearFilters = () => {
    setPriorityFilter("all");
    setStatusFilter("all");
    setSearchTerm("");
    setSortOrder("newest");
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <div className="w-64 bg-gray-900 text-white">
        <Sidebar />
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-4 relative">
          <h2 className=" flex items-center gap-2 text-lg font-bold text-white"> <FiCheckSquare/>Todos</h2>

          {/* Search */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1/3">
            <input
              type="text"
              placeholder="Search todos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Link to="../todo/create">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md">
              + Add Todo
            </button>
          </Link>
        </div>

        {/* Filter + Sort Row */}
        <div className="flex justify-end items-center gap-4 mb-4 relative">

          {/* LEFT SIDE - Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FiFilter size={18} /> Filters
          </button>

          
         
        </div>

        {/* FILTER DROPDOWN PANEL */}
        {showFilters && (
          <div className="mb-4 bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
            <Filter
              priorityFilter={priorityFilter}
              setPriorityFilter={setPriorityFilter}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />

            <button
              onClick={clearFilters}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Clear Filters
            </button>
          </div>
        )}

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-3 text-sm font-semibold text-gray-700 w-16">S.N.</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Title</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Priority</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700">Due Date</th>
              <th className="px-4 py-3 text-sm font-semibold text-gray-700 w-28">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo, index) => (
                <React.Fragment key={todo.id}>
                  <tr className="border-b hover:bg-gray-700">
                    <td className="px-4 py-3 text-sm text-white">{index + 1}</td>
                    <td className="px-4 py-3 text-sm text-white">{todo.title}</td>

                    <td className="px-6 py-3">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          todo.priority === "high"
                            ? "bg-red-100 text-red-700"
                            : todo.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {todo.priority}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          todo.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : todo.status === "in_progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {todo.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-sm text-white">
                      {todo.due_date || "-"}
                    </td>

                    <td className="px-4 py-3 flex gap-3">
                      <Link
                          to={`/todo/detail/${todo.id}`}
                          className="text-green-600 font-bold hover:underline"
                        >
                          Detail
                        </Link>
                        <Link
                          to={`/todo/edit/${todo.id}`}
                          className="text-blue-600 font-bold hover:underline"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => openDeleteConfirm(todo.id)}
                          className="text-red-600 font-bold hover:underline"
                        >
                          Delete
                        </button>

                        {/* NEW: Expand Description Button */}
                        <button
                          onClick={() =>
                            setExpandedRow(expandedRow === todo.id ? null : todo.id)
                          }
                          className="text-gray-400 hover:text-white font-bold"
                        >
                          {expandedRow === todo.id ? <FiChevronUp /> : <FiChevronDown />}
                        </button>
                      </td>
                  </tr>

                  {expandedRow === todo.id && (
                    <tr className="bg-gray-800">
                      <td colSpan="6" className="px-6 py-4 text-sm text-gray-200">
                        <div className="px-14">
                          <p><b>Description:</b> {todo.description || "-"}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-400 py-6">
                  No todos found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        open={deleteConfirmOpen}
        title="Delete Todo"
        message="Are you sure you want to delete this todo?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmOpen(false)}
      />
    </div>
  );
};

export default Show;