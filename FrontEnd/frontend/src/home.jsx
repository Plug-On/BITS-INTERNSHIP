import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import heroImage from "./assets/her.jpeg"

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Header />

        <section className="relative min-h-screen flex items-center justify-center">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl font-bold text-white mb-6">
          Bitmap Project Tracker
        </h1>

        <p className="text-gray-200 max-w-xl mx-auto mb-8">
          Manage users, companies, hosting, domains and documents from one place.
        </p>

        <div className="flex gap-4 justify-center">
          <button
          onClick={() => navigate('/login')}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"> 
          Login
        </button>
          <button 
          onClick={() => navigate('/register')}
          className="px-6 py-3 bg-green-600 rounded-lg hover:bg-indigo-700">
            Get Started
          </button>
        </div>
      </div>

    </section>


      {/* FEATURES SECTION */}
      <section className="bg-gray-800 py-20 px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Key Features
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <Feature
            title="User Management"
            desc="Role-based users (Admin, Employee, Customer) with secure access control."
          />
          <Feature
            title="Company Tracking"
            desc="Manage domains, hosting plans, providers and expiry dates easily."
          />
          <Feature
            title="Document Management"
            desc="Upload, view and export important documents in PDF format."
          />
          <Feature
            title="Secure Authentication"
            desc="JWT-based authentication for safe and reliable access."
          />
          <Feature
            title="Admin Dashboard"
            desc="Clean admin panel to manage everything in one place."
          />
          <Feature
            title="Scalable System"
            desc="Built with Laravel + React for performance and scalability."
          />
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 text-center px-6">
        <h2 className="text-3xl font-semibold mb-4">
          Ready to manage your web projects smarter?
        </h2>
        <p className="text-gray-300 mb-6">
          Create an account and start tracking everything today.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium"
        >
          Create Account
        </button>
      </section>

      <Footer />
    </div>
  );
};

const Feature = ({ title, desc }) => (
  <div className="bg-gray-900 p-6 rounded-lg shadow hover:shadow-lg transition">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{desc}</p>
  </div>
);

export default Home;
