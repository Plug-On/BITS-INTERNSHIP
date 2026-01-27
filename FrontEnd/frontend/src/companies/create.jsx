import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Create = () => {
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

  const [errors, setErrors] = useState({});

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
    setErrors({ ...errors, [e.target.name]: null });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    Object.keys(files).forEach((key) => {
      if (files[key]) data.append(key, files[key]);
    });

    try {
      await axios.post("http://127.0.0.1:8000/api/companies", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Company created successfully!");
      navigate("../companies/show");
    } catch (err) {
      if (err.response?.status === 422) {
        toast.error(err.response.data.errors);
      } else {
        toast.error("Error creating company");
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      <div className="w-64">
        <Sidebar />
      </div>

      <div className="flex-1 bg-gray-800 p-6 overflow-auto">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Company Creation
        </h2>

        <Link to="../companies/show">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6">
            BACK
          </button>
        </Link>

        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg">
          {/* Company Info */}
          <Section title="Company Information">
            <Input label="Company Name" name="name" value={formData.name} onChange={handleChange} errors={errors} />
            <Input label="Company Email" type="email" name="email" value={formData.email} onChange={handleChange} errors={errors} />
            <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} errors={errors} />
            <Input label="Address" name="address" value={formData.address} onChange={handleChange} errors={errors} />

            <Input label="Status" type="select" name="status" value={formData.status} onChange={handleChange} errors={errors}>
              <option value="">Select</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Input>
          </Section>

          {/* Hosting & Domain */}
          <Section title="Hosting & Domain">
            <Input label="Hosting Type" type="select" name="hosting" value={formData.hosting} onChange={handleChange} errors={errors}>
              <option value="">Select</option>
              <option value="Single">Single</option>
              <option value="Shared">Shared</option>
            </Input>

            <Input label="Hosting Plan" name="hosting_plan" value={formData.hosting_plan} onChange={handleChange} errors={errors} />
            <Input label="Hosting Company" name="hosting_company" value={formData.hosting_company} onChange={handleChange} errors={errors} />
            <Input label="Hosting Plan Start" type="date" name="hosting_plan_start" value={formData.hosting_plan_start} onChange={handleChange} errors={errors} />
            <Input label="Hosting Expiry Date" type="date" name="hosting_expiry" value={formData.hosting_expiry} onChange={handleChange} errors={errors} />
            <Input label="Hosting Charge" type="number" name="hosting_charge" value={formData.hosting_charge} onChange={handleChange} errors={errors} />

            <Input label="Domain" name="domain" value={formData.domain} onChange={handleChange} errors={errors} />
            <Input label="Domain Company" name="domain_company" value={formData.domain_company} onChange={handleChange} errors={errors} />
            <Input label="Domain Plan Start" type="date" name="domain_plan_start" value={formData.domain_plan_start} onChange={handleChange} errors={errors} />
            <Input label="Domain Expiry Date" type="date" name="domain_expiry" value={formData.domain_expiry} onChange={handleChange} errors={errors} />
            <Input label="Domain Charge" type="number" name="domain_charge" value={formData.domain_charge} onChange={handleChange} errors={errors} />
          </Section>

          {/* Renewal */}
          <Section title="Renewal & Maintenance">
            <Input label="Hosting Renew Charge" type="number" name="hosting_renew_charge" value={formData.hosting_renew_charge} onChange={handleChange} errors={errors} />
            <Input label="Domain Renew Charge" type="number" name="domain_renew_charge" value={formData.domain_renew_charge} onChange={handleChange} errors={errors} />
            <Input label="Maintenance Charge" type="number" name="maintenance_charge" value={formData.maintenance_charge} onChange={handleChange} errors={errors} />
          </Section>

          {/* Documents */}
          <Section title="Documents">
            <FileInput label="Registration Document" name="registration_document" onChange={handleFileChange} errors={errors} />
            <FileInput label="PAN Document" name="pan_document" onChange={handleFileChange} errors={errors} />
            <FileInput label="Letter" name="letter" onChange={handleFileChange} errors={errors} />
            <FileInput label="Company Logo" name="logo" onChange={handleFileChange} errors={errors} />
          </Section>

          {/* Personal */}
          <Section title="Personal Contact">
            <Input label="Personal Name" name="p_name" value={formData.p_name} onChange={handleChange} errors={errors} />
            <Input label="Personal Phone" name="p_phone" value={formData.p_phone} onChange={handleChange} errors={errors} />
          </Section>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-6">
            Create Company 
          </button>
        </form>
      </div>
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const Input = ({ label, type = "text", name, value, onChange, children, errors }) => {
  const error = errors?.[name];

  return (
    <div>
      <label className="block text-sm text-gray-300 mb-1">{label}</label>

      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 bg-gray-800 border rounded text-white
          ${error ? "border-red-500" : "border-gray-700"}`}
        >
          {children}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full px-3 py-2 bg-gray-800 border rounded text-white
          ${error ? "border-red-500" : "border-gray-700"}`}
        />
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error[0]}</p>}
    </div>
  );
};

const FileInput = ({ label, name, onChange, errors }) => {
  const error = errors?.[name];

  return (
    <div>
      <label className="block text-sm text-gray-300 mb-1">{label}</label>
      <input
        type="file"
        name={name}
        onChange={onChange}
        className={`w-full text-sm bg-gray-800 border rounded
        ${error ? "border-red-500" : "border-gray-700"}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error[0]}</p>}
    </div>
  );
};

const Section = ({ title, children }) => (
  <>
    <h3 className="text-lg text-white font-semibold mt-8 mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </>
);

export default Create;
