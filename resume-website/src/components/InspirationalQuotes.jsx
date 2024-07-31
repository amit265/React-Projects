import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const InspirationalQuotes = ({ quotes }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === quotes.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? quotes.length - 1 : prev - 1));
  };
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full flex flex-col items-center justify-center py-8 bg-gray-100">
      <div className="relative w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 text-center">
       
          <div className="flex flex-col items-center gap-4 text-[#323954]">
            <img
              className="h-24 w-24 rounded-full"
              src={quotes[current].image}
              alt={quotes[current].author}
            />
            <p className="text-xl italic mb-4">{quotes[current].text}</p>
            <h3 className="text-lg font-semibold">{quotes[current].author}</h3>
          </div>
        <div className="flex justify-center mt-4">
          {quotes.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 mx-1 rounded-full cursor-pointer ${
                index === current ? "bg-gray-800" : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InspirationalQuotes;
