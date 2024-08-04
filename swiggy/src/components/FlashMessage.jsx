import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const FlashMessage = ({ message, onClose }) => {
    const navigate = useNavigate();
  useEffect(() => {
    // Automatically close the flash message after 2 seconds
    const timer = setTimeout(() => {
      onClose();
      navigate(BASE_URL); // Navigate to main page after timeout

    }, 5000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [onClose]);

  return (
   
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl transform transition-all duration-700 ease-in-out scale-110">
      <h2 className="text-3xl font-extrabold text-center text-green-500">
        🎉 <span className="font-cursive">Order Placed!</span> 🎉
      </h2>
      <p className="mt-4 text-lg text-center text-gray-800 font-semibold">
        Thank you for your purchase! <br />
        Your delicious meal is on its way! 🚀🍕
      </p>
      {/* <p>{message}</p> */}
      <Link to ={BASE_URL}><h1 className='py-4 my-4 text-center font-bold text-red-500 shadow-lg p-4 bg-gray-200 hover:bg-gray-300 w-6/12 mx-auto'>Go to Restaurant</h1></Link>
    </div>
  </div>
  );
};

export default FlashMessage;
