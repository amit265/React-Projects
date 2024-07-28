import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const FlashMessageGeneral = ({ message }) => {
    const navigate = useNavigate();
  useEffect(() => {
    // Automatically close the flash message after 2 seconds
    const timer = setTimeout(() => {
      navigate(BASE_URL); // Navigate to main page after timeout

    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
   
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl transform transition-all duration-700 ease-in-out scale-110">
      <h2 className="text-3xl font-extrabold text-center text-green-500">
      😐 <span className="font-cursive">No Menu Found</span> 😐
      </h2>
      <p className="mt-4 text-lg text-center text-gray-800 font-semibold">
      Unfortunately there is no menu available for <span className='text-red-500'>{message}</span> 
      </p>
      <Link to ={BASE_URL}><h1 className='py-4 my-4 text-center font-bold text-red-500 shadow-lg p-4 bg-gray-200 hover:bg-gray-300 w-6/12 mx-auto'>Going back to Restaurant</h1></Link>
    </div>
  </div>
  );
};

export default FlashMessageGeneral;
