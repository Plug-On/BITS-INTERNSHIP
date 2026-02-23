import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const detail = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/todo/${id}`)
      .then((res) => setTodo(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!todo) {
    return <div className="text-white p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 text-white">
        <Sidebar />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 bg-gray-800 text-white">
        {/* Back Button */}
        <Link to="../todo/show">
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded mb-6">
            BACK
          </button>
        </Link>

        <h2 className="text-2xl font-semibold mb-6">Todo Details</h2>

        {/* Todo Info */}
        <Card title="Todo Information">
          <Info label="Title" value={todo.title} />
          <Info label="Description" value={todo.description} />
          <Info label="Priority" value={todo.priority} />
          <Info label="Status" value={todo.status} />
          <Info label="Due Date" value={todo.due_date} />
        </Card>
      </div>
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const Card = ({ title, children }) => (
  <div className="bg-gray-900 p-6 rounded mb-6">
    <h3 className="text-white font-bold text-xl mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="font-medium text-white">{value || "-"}</p>
  </div>
);

export default detail;