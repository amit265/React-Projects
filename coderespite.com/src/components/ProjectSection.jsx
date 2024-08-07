import React from "react";
import {
  BASE_URL_JS_IMAGE,
  BASE_URL_JS_PROJECT,
  GITHUB_BASE,
} from "../utils/projects";

const ProjectSection = ({
  title,
  projects,
  path_root,
  github,
  horizontalScroll,
  animation,
}) => {
  return (
    <div className="text-[var(--background-color)]">
      <h2 className="text-3xl font-bold mb-6 text-[var(--primary-color)] hover:text-[#ef233c] lexend">
        {title}
      </h2>

      <div
        className={`flex pb-4 justify-center lg:justify-between  ${
          horizontalScroll ? "flex-wrap lg:flex-nowrap lg:overflow-x-auto" : "flex-wrap"
        } gap-8`}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className={`w-80 px-4 py-2 border rounded-lg shadow-lg flex-shrink-0 bg-[var(--text-color)] ${
              animation ? "project-animate" : ""
            } hover:transform-gpu hover:scale-105`}
          >
            <div className="flex justify-between">
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
                    <button className="bg-[var(--primary-color)] px-4 py-2 text-[var(--text-color)] rounded-md hover:bg-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors duration-300">
                      Live
                    </button>
                  </a>
                  <a
                    href={GITHUB_BASE + github + project.path}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-[var(--primary-color)] text-[var(--text-color)] px-4 py-2 rounded-md hover:bg-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors duration-300">
                      Code
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <p className="pt-4 text-justify">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
