import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../header';
import Footer from '../footer';
import { Link } from 'react-router-dom';

const Create = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0 bg-gray-900 text-white">
          <Sidebar />
        </div>


      <div className="flex-1 overflow-auto bg-gray-900 p-6">
                    {/* <div className="bg-gray-800 rounded shadow p-6 min-h-[80vh]">
                        <h2 className="text-2xl text-white font-semibold mb-4">
                          Add company
                        </h2>
        
                        <p className="text-white">
                          Your main page content goes here.
                        </p>
                    </div> */}
        
        
                <div className="flex items-center justify-between mb-4">
              
        
                <Link to="../users/show">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md">
                       BACK
                  </button>
                </Link>
        
        
              </div>




        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-gray-800 p-6">
          <div className="w-full bg-gray-900 rounded-lg shadow-md p-6">

            <h2 className="text-2xl font-semibold text-white mb-6">Create User</h2>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter name"
                className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
            <Link to="../users/show">
                <button type="button"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition">
                Create
                </button>
            </Link>

          </div>
        </div>
      </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
    
  );
};

export default Create;
