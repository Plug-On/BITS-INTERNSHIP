import React, { useState , useEffect} from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../header';
import Footer from '../footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {

    const {id} =useParams();

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
     const [error, setError] = useState("");
      const [success, setSuccess] = useState("");
      const navigate = useNavigate();

      const fetchUser = async() => {
        try {
          const res = await axios.get(
          `http://localhost:8000/api/users/${id}`
        );

        setName(res.data.name);
        setEmail(res.data.email);
        setPassword("");
        } catch (err) {
         
    console.error(err);
        }
      };

      useEffect(()=>{
        fetchUser();
      },[id]);

   const handleSubmit = async (e) => {
        e.preventDefault();

              const data = {
                name,
                email,
              };

              if (password) {
                data.password = password;
              }

          try {
            await axios.put(
              `http://localhost:8000/api/users/${id}`,
              data
            );

            setSuccess("User updated successfully.");
            setError("");
            navigate("../users/show");
          } catch (err) {
            if (err.response?.data?.errors) {
              setError("User update failed");
            } else {
              setError("Something went wrong.");
            }
            setSuccess("");
          }

};

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

          <form onSubmit={handleSubmit}>

            <h2 className="text-2xl font-semibold text-white mb-6">Edit User</h2>

            {/* Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={name}
                type="text"
                onChange={e=> setName(e.target.value)}
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
              id="email"
                name="email"
                value={email}
                type="email"
                onChange={e=> setEmail(e.target.value)}
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
              id="password"
                name="password"
                value={password}
                type="password"
                onChange={e=> setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit Button */}
           
                <button type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition">
                Update
                </button>
            
          
          </form>

              {error && (
          <div className="mt-4 text-red-600 text-sm text-center">{error}</div>
        )}
        {success && (
          <div className="mt-4 text-green-600 text-sm text-center">{success}</div>
        )}        


          </div>
        </div>
      </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
    
  );
};

export default Edit;
