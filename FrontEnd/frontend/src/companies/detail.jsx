import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../header";
import Footer from "../footer";

const Detail = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/companies/${id}`)
      .then((res) => setCompany(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!company) {
    return <div className="text-white p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />
      <div className="flex flex-1">
              <div className="w-64 bg-gray-900 text-white">
                <Sidebar />
              </div>

        <div className="flex-1 p-6 bg-gray-800">
          {/* Back */}
          <Link to="../companies/show">
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md mb-6">
                  BACK
                </button>
             </Link>

          <h2 className="text-2xl text-white font-semibold mb-6">
            Company Details
          </h2>

          {/* Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-900 p-6 rounded text-gray-300">
            <Info label="Company Name" value={company.name} />
            <Info label="Email" value={company.email} />
            <Info label="Phone" value={company.phone} />
            <Info label="Address" value={company.address} />
            <Info label="Status" value={company.status} />

            <Info label="Hosting Type" value={company.hosting} />
            <Info label="Hosting Plan" value={company.hosting_plan} />
            <Info label="Hosting Company" value={company.hosting_company} />
            <Info label="Hosting Start" value={company.hosting_plan_start} />
            <Info label="Hosting Expiry" value={company.hosting_expiry} />

            <Info label="Domain" value={company.domain} />
            <Info label="Domain Company" value={company.domain_company} />
            <Info label="Domain Start" value={company.domain_plan_start} />
            <Info label="Domain Expiry" value={company.domain_expiry} />

            <Info label="Hosting Charge" value={company.hosting_charge} />
            <Info label="Domain Charge" value={company.domain_charge} />
            <Info label="Maintenance Charge" value={company.maintenance_charge} />
            <Info label="Hosting Renew Charge" value={company.hosting_renew_charge} />
            <Info label="Domain Renew Charge" value={company.domain_renew_charge} />

            <Info label="Contact Name" value={company.p_name} />
            <Info label="Contact Phone" value={company.p_phone} />
          </div>

          {/* Documents */}
          <div className="bg-gray-900 p-6 rounded mt-6 text-gray-300">
            <h3 className="text-white font-semibold mb-4">Documents</h3>

            {company.registration_document && (
              <Doc label="Registration Document" file={company.registration_document} />
            )}

            {company.pan_document && (
              <Doc label="PAN Document" file={company.pan_document} />
            )}

            {company.letter && (
              <Doc label="Letter" file={company.letter} />
            )}

            {company.logo && (
              <img
                src={`http://127.0.0.1:8000/storage/${company.logo}`}
                alt="Logo"
                className="h-24 mt-4"
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="font-medium">{value || "-"}</p>
  </div>
);

const Doc = ({ label, file }) => (
  <p>
    {label}:{" "}
    <a
      href={`http://127.0.0.1:8000/storage/${file}`}
      target="_blank"
      rel="noreferrer"
      className="text-blue-400 underline"
    >
      View
    </a>
  </p>
);

export default Detail;
