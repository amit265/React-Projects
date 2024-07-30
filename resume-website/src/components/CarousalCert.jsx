import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const CarouselCert = ({ certificates }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === certificates.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? certificates.length - 1 : current - 1);
  };

  return (
    <>
        <div className="relative w-full max-w-4xl mx-auto sm:my-8">
          <div>
            <button
              onClick={prevSlide}
              className="absolute z-10 left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 z-10 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
            >
              <FaArrowRight />
            </button>
          </div>
          {certificates
            .filter((_, index) => index === current)
            .map((cert, index) => (
              <div key={index} className="p-4">
                <div className=" bg-white shadow-lg rounded-lg p-4">
                  <div className="flex flex-row gap-4">
                    <h3 className="text-lg sm:text-2xl font-semibold">{cert.title}</h3>
                    <a
                      href={cert.cert_link}
                      target="_blank"
                      className="cursor-pointer font-bold text-lg text-white hover:bg-gray-600 px-2 py-1 rounded-lg"
                    >
                      🔗
                    </a>
                  </div>
                  <img
                    className="w-full mx-auto h-96 border-0 rounded-lg mt-4"
                    src={cert.cert_pic}
                    alt={cert.title}
                  />

                  <p className="text-sm mt-2 text-gray-700 p-4">
                    By: {cert.org}
                  </p>
                </div>
              </div>
            ))}
        </div>
    </>
  );
};

export default CarouselCert;
