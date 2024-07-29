import React, { useState } from 'react';

const ThumbnailToGif = ({ thumbnailSrc, gifSrc }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div 
        className="relative w-96 cursor-pointer" 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <img 
          src={thumbnailSrc} 
          alt="Thumbnail" 
          className={`w-full ${isHovered ? 'hidden' : 'block'}`} 
        />
        <img 
          src={gifSrc} 
          alt="GIF" 
          className={`w-full ${isHovered ? 'block' : 'hidden'}`} 
        />
      </div>

      {isModalOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 p-4" 
          onClick={closeModal}
        >
          <div className="relative max-w-full max-h-full">
            <span 
              className="absolute top-0 right-0 text-white text-3xl cursor-pointer p-4" 
              onClick={closeModal}
            >
              &times;
            </span>
            <img className="max-w-full max-h-full" src={gifSrc} alt="Enlarged GIF" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ThumbnailToGif;
