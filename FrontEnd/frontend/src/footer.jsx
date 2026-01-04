import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
        <div className='grid grid-cols-3 gap-4 bg-blue-900 text-white py-5 px-24'>
            <div>
                <h1 className='text-2xl font-bold'>About Us</h1>
                <p>Project track kare aisa sara duniya puche kaisa</p>
            </div>
            <div>
                <h1 className='text-2xl font-bold'>Services</h1>
                <ul>
                    <li>
            <Link to="/" className="block rounded py-2 pr-4 pl-3 text-white" aria-current="page">Home</Link>
          </li>
          <li>
            <Link to="/login" className="block rounded py-2 pr-4 pl-3 text-white" aria-current="page">Login</Link>
          </li>
          <li>
            <Link to="/register" className="block rounded py-2 pr-4 pl-3 text-white" aria-current="page">Register</Link>
          </li>
                </ul>
            </div>

            <div>
                <h1 className='text-2xl font-bold'>Contact Us</h1>
                <p>123-456-7890</p>
                <p> 123-456-7890</p>
                <p> 123-456-7890</p>
            </div>

        </div>
        <div className='bg-gray-800 text-white text-center p-4'>
            <p>&copy; 2026 Project Tracker</p>
        </div>
    </div>
  )
}

export default Footer