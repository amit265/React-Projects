import React from "react";
import ReactDOM from "react-dom";
import { XIcon } from "@heroicons/react/solid"; // You may need to install @heroicons/react

const TrailerModal = ({ isOpen, onClose, trailerKey }) => {
  if (!isOpen) return null;

  // Close modal when clicking outside the content
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      onClick={handleOverlayClick}
    >
      <div className="relative w-full max-w-4xl mx-4 md:mx-8 bg-black rounded-lg overflow-hidden">
        <button
          className="absolute top-2 right-2 p-2 text-white"
          onClick={onClose}
        >
          <XIcon className="h-6 w-6" />
        </button>
        <iframe
          className="w-full h-[56.25vw] md:h-[60vh]"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=1`}
          title="YouTube trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>,
    document.body
  );
};

export default TrailerModal;
