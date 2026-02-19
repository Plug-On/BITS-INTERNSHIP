import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { toast } from "react-hot-toast";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "pending",
    due_date: "",
  });

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/todo/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/todo/${id}`, form);
      toast.success("Todo updated successfully!");
      navigate("/todo/show");
    } catch (error) {
      toast.error("Failed to update todo.");
      console.error(error);
    }
  };

  return (
  <div className="min-h-screen flex bg-gray-900 text-white">
    <div className="w-64">
      <Sidebar />
    </div>

    <div className="flex-1 bg-gray-800 p-6 overflow-auto">
      <h2 className="text-2xl font-semibold text-white mb-6">Edit Todo</h2>

    
        <Link to="../todo/show">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6">
            BACK
          </button>
        </Link>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* First Row - Title (Full Width) */}
          <div className="md:col-span-3">
            <label className="block text-sm text-gray-300 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
              required
            />
          </div>

          {/* Second Row - Description (Full Width) */}
          <div className="md:col-span-3">
            <label className="block text-sm text-gray-300 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            />
          </div>

          {/* Third Row - Priority, Status, Due Date */}
          <div>
            <label className="block text-sm text-gray-300 mb-1">Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Due Date</label>
            <input
              type="date"
              name="due_date"
              value={form.due_date || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white"
            />
          </div>

        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-6"
        >
          Update Todo
        </button>
      </form>
    </div>
  </div>
);

};

export default Edit;
