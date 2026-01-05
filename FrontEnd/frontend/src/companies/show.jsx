import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../header";
import Footer from "../footer";
import { Link } from "react-router-dom";

// Sample dummy data
const companiesData = [
  {
    id: 1,
    name: "Nike",
    status: "Active",
    hosting: "AWS",
    domain: "nike.com",
    personalName: "John Doe",
    personalPhone: "9876543210",
  },
  {
    id: 2,
    name: "Adidas",
    status: "Inactive",
    hosting: "Google Cloud",
    domain: "adidas.com",
    personalName: "Jane Smith",
    personalPhone: "9876501234",
  },
];

const Show = () => {
  return (
    <div>
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0 bg-gray-900 text-white">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-gray-900 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Companies</h2>

            <Link to="../companies/create">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md">
                + Add Company
              </button>
            </Link>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 w-16">ID</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Name</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Hosting</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Domain</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Contact</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 w-28">Action</th>
              </tr>
            </thead>

            <tbody>
              {companiesData.map((company) => (
                <tr key={company.id} className="border-b hover:bg-gray-700">
                  <td className="px-4 py-3 text-white text-sm text-gray-700">{company.id}</td>
                  <td className="px-4 py-3 text-white text-sm text-gray-700">{company.name}</td>
                  <td className="px-4 py-3 text-white text-sm text-gray-700">{company.hosting}</td>
                  <td className="px-4 py-3 text-white text-sm text-gray-700">{company.domain}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        company.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {company.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white text-sm text-gray-700">
                    {company.personalName} ({company.personalPhone})
                  </td>
                  <td className="px-4 py-3 flex gap-3">
                    <Link to="/companies/edit" className="text-blue-600 font-bold hover:scale-105 hover:text-blue-400 hover:underline cursor-pointer">
                      Edit
                    </Link>
                    <span className="text-red-600 font-bold hover:scale-105 hover:text-red-400 hover:underline cursor-pointer">Delete</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Show;
