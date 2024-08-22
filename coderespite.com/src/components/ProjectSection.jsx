import { useState } from "react";

const ProjectSection = ({ title, projects, horizontalScroll, animation }) => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="text-[var(--background-color)]">
      <h2 className="text-2xl font-bold mb-4 text-[var(--primary-color)] hover:text-[#ef233c] lexend p-4">
        {title}
      </h2>

      <div
        className={`flex px-4 items-center py-4 justify-center ${
          horizontalScroll
            ? "flex-wrap  no-scrollbar"
            : "flex-wrap"
        } gap-8`}
      >
        {projects.map((project) => (
          <div
            key={project.id + project.title}
            className={`w-80 h-[28rem] px-4 py-2 border rounded-lg shadow-[var(--background-color)] shadow-lg flex-shrink-0 bg-[var(--text-color)] transition-transform duration-300 ${
              hovered === null && animation ? "lg:animate-move" : ""
            } hover:scale-105 ${
              hovered === project.id ? "relative z-10" : ""
            }`}
            onMouseEnter={() => setHovered(project.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex justify-between">
              <h3 className="text-2xl font-semibold mb-4">{project.title}</h3>
            </div>
            <div className="relative">
              <a
                href={project.path_root}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="object-cover h-56 mx-auto w-full rounded-lg shadow-lg cursor-pointer"
                  src={project.image_root}
                  alt={project.path}
                />
              </a>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-lg">
                <div className="flex gap-4">
                  <a
                    href={project.path_root}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="bg-[var(--primary-color)] px-4 py-2 text-[var(--text-color)] rounded-md hover:bg-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors duration-300">
                      Live
                    </button>
                  </a>
                  <a
                    href={project.github_root}
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
