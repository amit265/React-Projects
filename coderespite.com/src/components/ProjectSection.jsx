import React from "react";
import {
  BASE_URL_JS_IMAGE,
  BASE_URL_JS_PROJECT,
  GITHUB_BASE,
} from "../utils/projects";

const ProjectSection = ({ title, projects, path_root, github }) => {
  return (
    <div className="p-2">
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="p-6 border rounded-lg shadow-md">
            <div className="flex justify-between pt-4">
              <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
            </div>
            <div className="relative">
              <a
                href={BASE_URL_JS_PROJECT + path_root + project.path}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="object-cover h-64 mx-auto w-full rounded-lg shadow-lg cursor-pointer"
                  src={BASE_URL_JS_IMAGE + path_root + project.path + ".png"}
                  alt={project.path}
                />
              </a>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-lg">
                <div className="flex gap-4">
                  <a
                    href={BASE_URL_JS_PROJECT + path_root + project.path}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300">
                      Live
                    </button>
                  </a>
                  <a
                    href={GITHUB_BASE + github + project.path}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300">
                      Code
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <p className="text-gray-600 px-4 pt-4">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
