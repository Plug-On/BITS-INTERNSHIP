import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

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

  const [errors, setErrors] = useState({});

  /* ================= FETCH COMPANY ================= */
  const fetchCompany = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/companies/${id}`
      );
      setFormData(res.data);
    } catch (err) {
      alert("Failed to load company data");
    }
  };

  useEffect(() => {
    fetchCompany();
  }, [id]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
    setErrors({ ...errors, [e.target.name]: null });
  };

  /* ================= UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const data = new FormData();

const fileFields = [
  "registration_document",
  "pan_document",
  "letter",
  "logo",
];

Object.keys(formData).forEach((key) => {
  if (!fileFields.includes(key) && formData[key] !== "") {
    data.append(key, formData[key]);
  }
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

      toast.success("Company updated successfully!");
      navigate("../companies/show");
    } catch (err) {
      if (err.response?.status === 422) {
        toast.error(err.response.data.errors);
      } else {
        toast.error("Error updating company");
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      <div className="w-64">
        <Sidebar />
      </div>

      <div className="flex-1 p-6 bg-gray-800 overflow-auto">
        <h2 className="text-2xl font-semibold text-white mb-6">
          Edit Company 
        </h2>

        <Link to="../companies/show">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-6">
            BACK
          </button>
        </Link>

        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg">
          <Section title="Company Information">
            <Input label="Company Name" name="name" value={formData.name} onChange={handleChange} errors={errors} />
            <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} errors={errors} />
            <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} errors={errors} />
            <Input label="Address" name="address" value={formData.address} onChange={handleChange} errors={errors} />

            <Input label="Status" type="select" name="status" value={formData.status} onChange={handleChange} errors={errors}>
              <option value="">Select</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Input>
          </Section>

          <Section title="Hosting & Domain">
            <Input label="Hosting Type" type="select" name="hosting" value={formData.hosting} onChange={handleChange} errors={errors}>
              <option value="">Select</option>
              <option value="Single">Single</option>
              <option value="Shared">Shared</option>
            </Input>

            <Input label="Hosting Plan" name="hosting_plan" value={formData.hosting_plan} onChange={handleChange} errors={errors} />
            <Input label="Hosting Company" name="hosting_company" value={formData.hosting_company} onChange={handleChange} errors={errors} />
            <Input label="Hosting Start" type="date" name="hosting_plan_start" value={formData.hosting_plan_start} onChange={handleChange} errors={errors} />
            <Input label="Hosting Expiry" type="date" name="hosting_expiry" value={formData.hosting_expiry} onChange={handleChange} errors={errors} />
            <Input label="Hosting Charge" type="number" name="hosting_charge" value={formData.hosting_charge} onChange={handleChange} errors={errors} />

            <Input label="Domain" name="domain" value={formData.domain} onChange={handleChange} errors={errors} />
            <Input label="Domain Company" name="domain_company" value={formData.domain_company} onChange={handleChange} errors={errors} />
            <Input label="Domain Start" type="date" name="domain_plan_start" value={formData.domain_plan_start} onChange={handleChange} errors={errors} />
            <Input label="Domain Expiry" type="date" name="domain_expiry" value={formData.domain_expiry} onChange={handleChange} errors={errors} />
            <Input label="Domain Charge" type="number" name="domain_charge" value={formData.domain_charge} onChange={handleChange} errors={errors} />
          </Section>

          <Section title="Renewal & Maintenance">
            <Input label="Hosting Renew Charge" type="number" name="hosting_renew_charge" value={formData.hosting_renew_charge} onChange={handleChange} errors={errors} />
            <Input label="Domain Renew Charge" type="number" name="domain_renew_charge" value={formData.domain_renew_charge} onChange={handleChange} errors={errors} />
            <Input label="Maintenance Charge" type="number" name="maintenance_charge" value={formData.maintenance_charge} onChange={handleChange} errors={errors} />
          </Section>

          <Section title="Documents">
                <DocumentCard
                  label="Registration Document"
                  name="registration_document"
                  currentFile={formData.registration_document}
                  onChange={handleFileChange}
                  errors={errors}
                />

                <DocumentCard
                  label="PAN Document"
                  name="pan_document"
                  currentFile={formData.pan_document}
                  onChange={handleFileChange}
                  errors={errors}
                />

                <DocumentCard
                  label="Letter"
                  name="letter"
                  currentFile={formData.letter}
                  onChange={handleFileChange}
                  errors={errors}
                />

                <DocumentCard
                  label="Company Logo"
                  name="logo"
                  currentFile={formData.logo}
                  onChange={handleFileChange}
                  errors={errors}
                  isImage
                />
          </Section>


          <Section title="Personal Contact">
            <Input label="Personal Name" name="p_name" value={formData.p_name} onChange={handleChange} errors={errors} />
            <Input label="Personal Phone" name="p_phone" value={formData.p_phone} onChange={handleChange} errors={errors} />
          </Section>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-6"
          >
            Update Company
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


const DocumentCard = ({
  label,
  name,
  currentFile,
  onChange,
  errors,
  isImage = false,
}) => {
  const error = errors?.[name];

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-200">{label}</p>

        {currentFile && (
          <a
            href={`http://127.0.0.1:8000/storage/${currentFile}`}
            target="_blank"
            className="text-xs text-blue-400 hover:underline"
          >
            View current
          </a>
        )}
      </div>

      {isImage && currentFile && (
        <img
          src={`http://127.0.0.1:8000/storage/${currentFile}`}
          alt="logo"
          className="h-16 w-16 object-contain bg-gray-900 rounded"
        />
      )}

      <input
        type="file"
        name={name}
        onChange={onChange}
        className={`w-full text-sm bg-gray-900 border rounded
        ${error ? "border-red-500" : "border-gray-700"}`}
      />

      <p className="text-xs text-gray-400">
        Upload only if you want to replace the existing file
      </p>

      {error && <p className="text-red-500 text-xs">{error[0]}</p>}
    </div>
  );
};


const Section = ({ title, children }) => (
  <>
    <h3 className="text-lg text-white font-semibold mt-8 mb-4">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </>
);

export default Edit;
