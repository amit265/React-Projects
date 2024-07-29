import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";



const Carousel = ({projects}) => {
  console.log(projects);
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === projects.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? projects.length - 1 : current - 1);
  };

  return (
    <>
      <div className="static">
        <div className="relative w-full max-w-4xl mx-auto my-8">
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
          {projects
            .filter((_, index) => index === current)
            .map((project, index) => (
              <div key={index} className="p-4">
                <div className=" bg-white shadow-lg rounded-lg p-4">
                  <div className="flex flex-row gap-4">
                    <h3 className="text-2xl font-semibold">{project.title}</h3>
                    <a
                      href={project.iframeSrc}
                      target="_blank"
                      className="font-bold text-lg text-white hover:bg-gray-600  bg-green-600 px-2 py-1 rounded-lg"
                    >
                      live
                    </a>
                    <a
                      href={project.url}
                      target="_blank"
                      className="font-bold text-lg text-white hover:bg-gray-600  bg-purple-600 px-2 py-1 rounded-lg"
                    >
                      code
                    </a>
                  </div>
                  <iframe
                    src={project.iframeSrc}
                    className="w-full mx-auto h-96 border-0 rounded-lg mt-4"
                    title={project.title}
                  />
                  <p className="text-lg mt-4 p-4 text-gray-600 text-wrap">
                    {project.description}
                  </p>
                  <p className="text-sm mt-2 text-gray-700 p-4">
                    Tech Stake: {project.techStack}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Carousel;
