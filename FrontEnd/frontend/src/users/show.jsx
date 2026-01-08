import React, { useEffect, useState } from 'react';
import Sidebar from "../components/Sidebar";
import Header from '../header';
import Footer from '../footer';
import { Link, Links } from 'react-router-dom';
import { getUsers } from "../services/userService";
import axios from 'axios';

const Users = () => {

 const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id)=>{
    if(confirm("Are you sure you want to delete?")){
       axios.delete(`http://localhost:8000/api/users/${id}`).then(() => {
        setUsers(users.filter(u => u.id !== id));
       });
    };
  };
  
  return (
     <div> <Header/>

    <div className="flex flex-1">

      {/* LEFT SIDE – Sidebar */}
      <div className="w-64 flex-shrink-0 bg-gray-900 text-white">
          <Sidebar/>
      </div>

      {/* RIGHT SIDE – Content */}
        <div className="flex-1 overflow-auto bg-gray-900 p-6">

        <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Users
        </h2>

        <Link to="../users/create">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md">
              + Add Users
          </button>
        </Link>


      </div>

      {/* Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800 text-left">
            <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 w-16">
              ID
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Name
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 w-24">
              Role
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 w-28">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) =>
          <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{user.id}</td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              {user.name}
            </td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              {user.email}
            </td>
            <td className="px-4 py-3">
              <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                User
              </span>
            </td>
            <td className="px-4 py-3 flex gap-3">
              <span className="text-blue-600 font-bold hover:scale-105 hover:underline cursor-pointer">
               <Link to ={`/users/edit/${user.id}`}>Edit</Link> 
              </span>
              <span className="text-red-600 hover:underline cursor-pointer">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="text-red-600 font-bold hover:scale-105 hover:underline cursor-pointer"
                >
                  Delete
                </button>

              </span>
            </td>
          </tr>
           )}

        
        </tbody>
      </table>
    




        </div>
    </div>
    <Footer/>
    </div>
    
  )
}

export default Users;
