import React from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

const Home = () => {
  const navigate = useNavigate()

  return (
    <div>
    <Header/>
    <div className="flex flex-col items-center justify-center min-h-screen">
      
      <h1 className="text-3xl font-bold mb-6">
        Bitmap Project Tracker
      </h1>

      <div className="flex gap-4">
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login
        </button>

        <button
          onClick={() => navigate('/register')}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Register
        </button>
      </div>
    </div>

    <Footer/>
    </div>

  )
}

export default Home
