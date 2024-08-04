import React, { useState } from "react";
import ProjectSection from "./ProjectSection";
import { projects } from "../utils/projects";

const ProjectPage = () => {
  const [selectedTab, setSelectedTab] = useState("react");

  const tabs = [
    { name: "All", key: "all" },
    { name: "React", key: "react" },
    { name: "JavaScript", key: "javascript" },
    { name: "Responsive Design", key: "responsive" },
  ];

  return (
    <div>
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          {/* <h1 className="text-4xl font-bold mb-8">Projects</h1> */}
          <div className="flex justify-center mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key)}
                className={`px-4 py-2 mx-2 rounded-md focus:outline-none ${
                  selectedTab === tab.key
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
          {selectedTab === "all" && (
            <>
              <ProjectSection
                title="React Projects"
                projects={projects.react}
                path_root="react/"
                github="React-Projects/tree/main/"
                />
              <ProjectSection
                title="JavaScript Projects"
                projects={projects.javascript}
                path_root="js-projects/"
                github="JavaScript-Projects/tree/main/"
                />
              <ProjectSection
                title="Web Responsive Design Projects"
                projects={projects.responsive}
                path_root="responsive/"
                github="freeCodeCamp/tree/main/responsive-web-design/"
              />
            </>
          )}
          {selectedTab === "react" && (
            <ProjectSection
              title="React Projects"
              projects={projects.react}
              path_root="react/"
              github="React-Projects/tree/main/"
            />
          )}
          {selectedTab === "javascript" && (
            <ProjectSection
              title="JavaScript Projects"
              projects={projects.javascript}
              path_root="js-projects/"
              github="JavaScript-Projects/tree/main/"
            />
          )}
          {selectedTab === "responsive" && (
            <ProjectSection
              title="Web Responsive Design Projects"
              projects={projects.responsive}
              path_root="responsive/"
              github="freeCodeCamp/tree/main/responsive-web-design/"
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectPage;
