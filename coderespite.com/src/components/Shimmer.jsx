import React from 'react';

const Shimmer = () => {
  return (
    <div className="flex flex-wrap gap-4 container text-center mx-auto">
      {/* Repeat the shimmer placeholder based on how many cards you need */}
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="w-80 h-96 mx-auto top-24 p-4 border rounded-lg shadow-md bg-gray-200 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
          <div className="relative">
            {/* Add content here if you need */}
            <div className="h-40 bg-gray-300 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
