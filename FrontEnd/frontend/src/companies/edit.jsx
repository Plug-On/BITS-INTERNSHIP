import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../header";
import Footer from "../footer";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    hosting: "",
    hosting_plan: "",
    hosting_company: "",
    hosting_plan_start: "",
    hosting_expiry: "",
    domain: "",
    domain_company: "",
    domain_plan_start: "",
    domain_expiry: "",
    hosting_charge: "",
    domain_charge: "",
    maintenance_charge: "",
    hosting_renew_charge: "",
    domain_renew_charge: "",
    status: "",
    p_name: "",
    p_phone: "",
  });

  const [files, setFiles] = useState({
    registration_document: null,
    pan_document: null,
    letter: null,
    logo: null,
  });

  /* ================= FETCH COMPANY ================= */
  const fetchCompany = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/companies/${id}`
      );
      setFormData(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load company data" +JSON.stringify(err.response.data) );
    }
  };

  useEffect(() => {
    fetchCompany();
  }, [id]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  /* ================= UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    Object.keys(files).forEach((key) => {
      if (files[key]) data.append(key, files[key]);
    });

    try {
      await axios.post(
        `http://127.0.0.1:8000/api/companies/${id}?_method=PUT`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Company updated successfully!");
      navigate("../companies/show");
    } catch (err) {
      console.error(err);
      alert("Error updating company" +JSON.stringify(err.response.data));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />

      <div className="flex flex-1">
        <div className="w-64 bg-gray-900 text-white">
          <Sidebar />
        </div>

        <div className="flex-1 overflow-auto bg-gray-800 p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Edit Company Plans
          </h2>

          <Link to="../companies/show">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md mb-6">
              BACK
            </button>
          </Link>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 rounded-lg shadow-md p-6"
          >
            {/* Company Info */}
            <Section title="Company Information">
              <Input label="Company Name" name="name" value={formData.name} onChange={handleChange} />
              <Input label="Company Email" type="email" name="email" value={formData.email} onChange={handleChange} />
              <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
              <Input label="Address" name="address" value={formData.address} onChange={handleChange} />
              <Input label="Status" type="select" name="status" value={formData.status} onChange={handleChange}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Input>
            </Section>

            {/* Hosting & Domain */}
            <Section title="Hosting & Domain">
              <Input label="Hosting Type" type="select" name="hosting" value={formData.hosting} onChange={handleChange}>
                <option value="Single">Single</option>
                <option value="Shared">Shared</option>
              </Input>

              <Input label="Hosting Plan" name="hosting_plan" value={formData.hosting_plan} onChange={handleChange} />
              <Input label="Hosting Company" name="hosting_company" value={formData.hosting_company} onChange={handleChange} />
              <Input label="Hosting Plan Start" type="date" name="hosting_plan_start" value={formData.hosting_plan_start} onChange={handleChange} />
              <Input label="Hosting Expiry Date" type="date" name="hosting_expiry" value={formData.hosting_expiry} onChange={handleChange} />
              <Input label="Hosting Charge" type="number" name="hosting_charge" value={formData.hosting_charge} onChange={handleChange} />

              <Input label="Domain" name="domain" value={formData.domain} onChange={handleChange} />
              <Input label="Domain Company" name="domain_company" value={formData.domain_company} onChange={handleChange} />
              <Input label="Domain Plan Start" type="date" name="domain_plan_start" value={formData.domain_plan_start} onChange={handleChange} />
              <Input label="Domain Expiry Date" type="date" name="domain_expiry" value={formData.domain_expiry} onChange={handleChange} />
              <Input label="Domain Charge" type="number" name="domain_charge" value={formData.domain_charge} onChange={handleChange} />
            </Section>

            {/* Renewal */}
            <Section title="Renewal & Maintenance">
              <Input label="Hosting Renew Charge" type="number" name="hosting_renew_charge" value={formData.hosting_renew_charge} onChange={handleChange} />
              <Input label="Domain Renew Charge" type="number" name="domain_renew_charge" value={formData.domain_renew_charge} onChange={handleChange} />
              <Input label="Maintenance Charge" type="number" name="maintenance_charge" value={formData.maintenance_charge} onChange={handleChange} />
            </Section>

            {/* Documents */}
            <Section title="Documents">
              <FileInput label="Registration Document" name="registration_document" onChange={handleFileChange} />
              <FileInput label="PAN Document" name="pan_document" onChange={handleFileChange} />
              <FileInput label="Letter" name="letter" onChange={handleFileChange} />
              <FileInput label="Company Logo" name="logo" onChange={handleFileChange} />
            </Section>

            {/* Personal */}
            <Section title="Personal Contact">
              <Input label="Personal Name" name="p_name" value={formData.p_name} onChange={handleChange} />
              <Input label="Personal Phone" name="p_phone" value={formData.p_phone} onChange={handleChange} />
            </Section>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md mt-6"
            >
              Update Company Plans
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

/* ================= REUSABLE ================= */
const Input = ({ label, type = "text", name, value, onChange, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    {type === "select" ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500"
      >
        {children}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-2 focus:ring-blue-500"
      />
    )}
  </div>
);

const FileInput = ({ label, name, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
    <input
      type="file"
      name={name}
      onChange={onChange}
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

export default Edit;
