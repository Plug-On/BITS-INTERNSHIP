import React from 'react'
import Sidebar from "../components/Sidebar";
import Header from '../header';
import Footer from '../footer';

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
            <div className="bg-gray-800 rounded shadow p-6 min-h-[80vh]">
                <h2 className="text-2xl text-white font-semibold mb-4">
                  Add Users
                </h2>

                <p className="text-white">
                  Your main page content goes here.
                </p>
            </div>
        </div>
    </div>
    <Footer/>
    </div>
    
  )
}

export default users
