import React from 'react'
import Sidebar from "../components/Sidebar";
import Header from '../header';
import Footer from '../footer';
import { Link, Links } from 'react-router-dom';

const users = () => {
  return (
     <div> <Header/>

    <div className="flex flex-1">

      {/* LEFT SIDE – Sidebar */}
      <div className="w-64 flex-shrink-0 bg-gray-900 text-white">
          <Sidebar/>
      </div>

      {/* RIGHT SIDE – Content */}
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
              Name
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 w-24">
              Status
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 w-28">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">1</td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Nike
            </td>
            <td className="px-4 py-3">
              <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                Active
              </span>
            </td>
            <td className="px-4 py-3 flex gap-3">
              <span className="text-blue-600 hover:underline cursor-pointer">
               <Link to ="/users/edit">Edit</Link> 
              </span>
              <span className="text-red-600 hover:underline cursor-pointer">
                Delete
              </span>
            </td>
          </tr>

          <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">2</td>
            <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Adidas
            </td>
            <td className="px-4 py-3">
              <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                Block
              </span>
            </td>
            <td className="px-4 py-3 flex gap-3">
              <span className="text-blue-600 hover:underline cursor-pointer">
                Edit
              </span>
              <span className="text-red-600 hover:underline cursor-pointer">
                Delete
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    




        </div>
    </div>
    <Footer/>
    </div>
    
  )
}

export default users;
