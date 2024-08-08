import React from 'react';

const ShimmerHome = (isLoading) => {
  return (
    <div className={`flex flex-wrap sm:overflow-x-auto sm:whitespace-nowrap py-4 transition-opacity duration-1000 ${!isLoading ? 'opacity-0' : 'opacity-100'}`}>
      <div className="inline-flex space-x-8">
        {/* Repeat the shimmer placeholder based on the number of visible cards */}
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="w-80 h-96 bg-gray-200 rounded-lg shadow-md relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse"></div>
            <div className="relative p-4">
              {/* Content area */}
              <div className="h-40 bg-gray-300 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShimmerHome;
