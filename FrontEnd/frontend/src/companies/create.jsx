import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../header";
import Footer from "../footer";
import { Link } from "react-router-dom";

const Create = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-gray-800 p-6">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">
             Company Plans Creation
            </h2>
            <Link to="../companies/show">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md">
                BACK
              </button>
            </Link>
          </div>

          <div className="bg-gray-900 rounded-lg shadow-md p-6">
            {/* SECTION: Company Info */}
            <h3 className="text-lg font-semibold text-white mb-4">
              Company Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Company Name" />
              <Input label="Company Email" type="email" />
              <Input label="Phone" />
              <Input label="Address" />
              <Input label="Status" placeholder="Active / Inactive / Expired" />
            </div>

            {/* SECTION: Hosting & Domain */}
            <Section title="Hosting & Domain">
              <Input label="Hosting" />
              <Input label="Hosting Plan" />
              <Input label="Hosting Company" />
              <Input label="Hosting Plan Start" type="date" />
              <Input label="Hosting Expiry Date" type="date" />
              <Input label="Hosting Charge" type="number" />

              <Input label="Domain" />
              <Input label="Domain Company" />
              <Input label="Domain Plan Start" type="date" />
              <Input label="Domain Expiry Date" type="date" />
              <Input label="Domain Charge" type="number" />
            </Section>

            {/* SECTION: Renewal & Maintenance */}
            <Section title="Renewal & Maintenance">
              <Input label="Hosting Renew Charge" type="number" />
              <Input label="Domain Renew Charge" type="number" />
              <Input label="Maintenance Charge" type="number" />
            </Section>

            {/* SECTION: Documents */}
            <Section title="Documents">
              <FileInput label="Registration Document" />
              <FileInput label="PAN Document" />
              <FileInput label="Letter" />
              <FileInput label="Company Logo" />
            </Section>

            {/* SECTION: Personal Contact */}
            <Section title="Personal Contact">
              <Input label="Personal Name" />
              <Input label="Personal Phone" />
            </Section>

            {/* Submit */}
            <div className="mt-6">
              <Link to="../companies/show">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition">
                Create Company Plans/Demand
              </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

/* Reusable Components */
const Input = ({ label, type = "text", placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-1">
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const FileInput = ({ label }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-1">
      {label}
    </label>
    <input
      type="file"
      className="w-full text-sm text-gray-300 bg-gray-800 border border-gray-700 rounded-md file:bg-gray-700 file:text-white file:border-0 file:px-3 file:py-1"
    />
  </div>
);

const Section = ({ title, children }) => (
  <>
    <h3 className="text-lg font-semibold text-white mt-8 mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </>
);

export default Create;
