// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <div className="max-w-md w-full p-4">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Page Not Found</p>
        <p className="text-gray-500 mb-8">
          Sorry, the page you are looking for does not exist. It might have been moved or deleted.
        </p>
        <Link to="/blog" className="text-white bg-blue-500 hover:bg-blue-600 font-medium py-2 px-4 rounded-lg transition duration-300">
          Go to Home
        </Link>
        <div className="mt-8">
          <img
            src="https://via.placeholder.com/400x300"
            alt="404 Illustration"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
