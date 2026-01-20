import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../header";
import Footer from "../footer";
import { Link } from "react-router-dom";
import { getCompanies } from "../services/userService";
import axios from "axios";
import ConfirmModal from "../components/ConfirmModal";
import { toast } from "react-hot-toast";

const Show = () => {
  const [companies, setCompanies] = useState([]);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  useEffect(() => {
    getCompanies()
      .then((res) => setCompanies(res.data))
      .catch((err) => console.error(err));
  }, []);

  const openDeleteConfirm = (id) => {
    setSelectedCompanyId(id);
    setDeleteConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/companies/${selectedCompanyId}`
      );

      setCompanies((prev) =>
        prev.filter((c) => c.id !== selectedCompanyId)
      );

      toast.success("Company deleted successfully");
    } catch (error) {
      toast.error("Failed to delete company");
    } finally {
      setDeleteConfirmOpen(false);
      setSelectedCompanyId(null);
    }
  };

  return (
    <div>
      {/* <Header /> */}

      <div className="flex flex-1">
        <div className="w-64 flex-shrink-0 bg-gray-900 text-white">
          <Sidebar />
        </div>

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
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 w-16">Logo</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Name</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Hosting</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Domain</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Status</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700">Contact</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-700 w-28">Action</th>
              </tr>
            </thead>

            <tbody>
              {companies?.length > 0 ? (
                companies.map((company) => (
                  <tr key={company.id} className="border-b hover:bg-gray-700">
                    <td className="px-4 py-3 text-sm text-white">{company.id}</td>
                    <td className="px-4 py-3">
                      <Avatar company={company} />
                    </td>
                    <td className="px-4 py-3 text-sm text-white">{company.name}</td>
                    <td className="px-4 py-3 text-sm text-white">{company.hosting}</td>
                    <td className="px-4 py-3 text-sm text-white">{company.domain}</td>
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
                    <td className="px-4 py-3 text-sm text-white">
                      {company.p_name} ({company.p_phone})
                    </td>
                    <td className="px-4 py-3 flex gap-3">
                      <Link
                        to={`/companies/detail/${company.id}`}
                        className="text-green-600 font-bold hover:underline"
                      >
                        View
                      </Link>
                      <Link
                        to={`/companies/edit/${company.id}`}
                        className="text-blue-600 font-bold hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => openDeleteConfirm(company.id)}
                        className="text-red-600 font-bold hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-gray-400 py-6">
                    No companies found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        open={deleteConfirmOpen}
        title="Delete Company"
        message="Are you sure you want to delete this company?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteConfirmOpen(false)}
      />

      {/* <Footer /> */}
    </div>
  );
};

// Avatar component
const Avatar = ({ company }) => {
  if (company.logo && company.logo.trim() !== "") {
    return (
      <img
        src={company.logo}
        alt="Logo"
        className="w-10 h-10 rounded-full object-cover"
      />
    );
  }

  const initials = company.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="w-10 h-10 rounded-full bg-gray-600 text-white flex items-center justify-center font-bold">
      {initials}
    </div>
  );
};

export default Show;
