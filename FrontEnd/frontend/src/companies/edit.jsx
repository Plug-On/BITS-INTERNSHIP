import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../header";
import Footer from "../footer";
import { Link } from "react-router-dom";

// Reusable components
const Input = ({ label, type = "text", value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const FileInput = ({ label }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <input
      type="file"
      className="w-full text-sm text-gray-300 bg-gray-800 border border-gray-700 rounded-md file:bg-gray-700 file:text-white file:border-0 file:px-3 file:py-1"
    />
  </div>
);

const Section = ({ title, children }) => (
  <>
    <h3 className="text-lg font-semibold text-white mt-8 mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </>
);

const Edit = () => {
  const [company, setCompany] = useState({
    name: "Sample Company",
    email: "sample@example.com",
    phone: "1234567890",
    address: "Kathmandu, Nepal",
    hosting: "Shared",
    hostingPlan: "Basic",
    domain: "example.com",
    hostingCompany: "HostNepal",
    domainCompany: "DomainNepal",
    hostingPlanStart: "2026-01-01",
    domainPlanStart: "2026-01-01",
    hostingExpiry: "2027-01-01",
    domainExpiry: "2027-01-01",
    registrationDoc: null,
    panDoc: null,
    letter: null,
    hostingCharge: "5000",
    domainCharge: "2000",
    maintenanceCharge: "1000",
    hostingRenewCharge: "4500",
    domainRenewCharge: "1800",
    status: "Active",
    logo: null,
    personalName: "John Doe",
    personalPhone: "9876543210",
  });

  // Simple change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <div className="w-64 flex-shrink-0 bg-gray-900 text-white">
          <Sidebar />
        </div>

        <div className="flex-1 overflow-auto bg-gray-900 p-6">
          <div className="flex items-center justify-between mb-4">
            <Link to="../companies/show">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md">
                BACK
              </button>
            </Link>
          </div>

          <div className="w-full bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-white mb-6">Edit Company Plans</h2>

            <Section title="Basic Info">
              <Input
                label="Name"
                value={company.name}
                onChange={(e) => handleChange({ target: { name: "name", value: e.target.value } })}
              />
              <Input
                label="Email"
                type="email"
                value={company.email}
                onChange={(e) => handleChange({ target: { name: "email", value: e.target.value } })}
              />
              <Input
                label="Phone"
                value={company.phone}
                onChange={(e) => handleChange({ target: { name: "phone", value: e.target.value } })}
              />
              <Input
                label="Address"
                value={company.address}
                onChange={(e) => handleChange({ target: { name: "address", value: e.target.value } })}
              />
            </Section>

            <Section title="Hosting & Domain">
              <Input
                label="Hosting"
                value={company.hosting}
                onChange={(e) => handleChange({ target: { name: "hosting", value: e.target.value } })}
              />
              <Input
                label="Hosting Plan"
                value={company.hostingPlan}
                onChange={(e) => handleChange({ target: { name: "hostingPlan", value: e.target.value } })}
              />
              <Input
                label="Domain"
                value={company.domain}
                onChange={(e) => handleChange({ target: { name: "domain", value: e.target.value } })}
              />
              <Input
                label="Hosting Company"
                value={company.hostingCompany}
                onChange={(e) => handleChange({ target: { name: "hostingCompany", value: e.target.value } })}
              />
              <Input
                label="Domain Company"
                value={company.domainCompany}
                onChange={(e) => handleChange({ target: { name: "domainCompany", value: e.target.value } })}
              />
              <Input
                label="Hosting Plan Start"
                type="date"
                value={company.hostingPlanStart}
                onChange={(e) => handleChange({ target: { name: "hostingPlanStart", value: e.target.value } })}
              />
              <Input
                label="Domain Plan Start"
                type="date"
                value={company.domainPlanStart}
                onChange={(e) => handleChange({ target: { name: "domainPlanStart", value: e.target.value } })}
              />
              <Input
                label="Hosting Expiry"
                type="date"
                value={company.hostingExpiry}
                onChange={(e) => handleChange({ target: { name: "hostingExpiry", value: e.target.value } })}
              />
              <Input
                label="Domain Expiry"
                type="date"
                value={company.domainExpiry}
                onChange={(e) => handleChange({ target: { name: "domainExpiry", value: e.target.value } })}
              />
            </Section>

            <Section title="Documents">
              <FileInput label="Registration Document" />
              <FileInput label="PAN Document" />
              <FileInput label="Letter" />
              <FileInput label="Logo" />
            </Section>

            <Section title="Charges & Status">
              <Input label="Hosting Charge" value={company.hostingCharge} onChange={(e) => handleChange({ target: { name: "hostingCharge", value: e.target.value } })} />
              <Input label="Domain Charge" value={company.domainCharge} onChange={(e) => handleChange({ target: { name: "domainCharge", value: e.target.value } })} />
              <Input label="Maintenance Charge" value={company.maintenanceCharge} onChange={(e) => handleChange({ target: { name: "maintenanceCharge", value: e.target.value } })} />
              <Input label="Hosting Renew Charge" value={company.hostingRenewCharge} onChange={(e) => handleChange({ target: { name: "hostingRenewCharge", value: e.target.value } })} />
              <Input label="Domain Renew Charge" value={company.domainRenewCharge} onChange={(e) => handleChange({ target: { name: "domainRenewCharge", value: e.target.value } })} />
              <Input label="Status" value={company.status} onChange={(e) => handleChange({ target: { name: "status", value: e.target.value } })} />
              <Input label="Personal Name" value={company.personalName} onChange={(e) => handleChange({ target: { name: "personalName", value: e.target.value } })} />
              <Input label="Personal Phone" value={company.personalPhone} onChange={(e) => handleChange({ target: { name: "personalPhone", value: e.target.value } })} />
            </Section>

              <Link to="../companies/show">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-6">
              Save Changes
            </button>
            </Link>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Edit;
