import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
useNavigate
const FlashMessage = ({ message, onClose }) => {
    const navigate = useNavigate();
  useEffect(() => {
    // Automatically close the flash message after 2 seconds
    const timer = setTimeout(() => {
      onClose();
      navigate(BASE_URL); // Navigate to main page after timeout

    }, 2000);

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
    </div>
  </div>
  );
};

export default FlashMessage;
