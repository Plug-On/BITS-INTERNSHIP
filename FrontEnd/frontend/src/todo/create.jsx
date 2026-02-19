import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Create = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
    due_date: "",
  });

  const [errors, setErrors] = useState({});

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await axios.post("http://127.0.0.1:8000/api/todo", formData);
      toast.success("Todo created successfully!");
      navigate("../todo/show");
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
        toast.error("Validation errors");
      } else {
        toast.error("Error creating todo");
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      <div className="w-64">
        <Sidebar />
      </div>

      <div className="flex-1 bg-gray-800 p-6 overflow-auto">
        <h2 className="text-2xl font-semibold text-white mb-6">Create Todo</h2>

        <Link to="../todo/show">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6">
            BACK
          </button>
        </Link>

        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg">
          {/* ================= TODO FORM ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* First Row: Title (full width) */}
            <div className="md:col-span-3">
              <Input
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                errors={errors}
              />
            </div>

            {/* Second Row: Description (full width textarea) */}
            <div className="md:col-span-3">
              <Input
                label="Description"
                type="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                errors={errors}
              />
            </div>

            {/* Third Row: Priority, Status, Due Date */}
            <Input
              label="Priority"
              type="select"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              errors={errors}
            >
              <option value="">Select</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Input>

            <Input
              label="Status"
              type="select"
              name="status"
              value={formData.status}
              onChange={handleChange}
              errors={errors}
            >
              <option value="">Select</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </Input>

            <Input
              label="Due Date"
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              errors={errors}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-6"
          >
            Create Todo
          </button>
        </form>
      </div>
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */
const Input = ({ label, type = "text", name, value, onChange, children, errors }) => {
  const error = errors?.[name];

  if (type === "textarea") {
    return (
      <div>
        <label className="block text-sm text-gray-300 mb-1">{label}</label>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={4}
          className={`w-full px-3 py-2 bg-gray-800 border rounded text-white ${
            error ? "border-red-500" : "border-gray-700"
          }`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error[0]}</p>}
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm text-gray-300 mb-1">{label}</label>

      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 bg-gray-800 border rounded text-white ${
            error ? "border-red-500" : "border-gray-700"
          }`}
        >
          {children}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 bg-gray-800 border rounded text-white ${
            error ? "border-red-500" : "border-gray-700"
          }`}
        />
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error[0]}</p>}
    </div>
  );
};

export default Create;
