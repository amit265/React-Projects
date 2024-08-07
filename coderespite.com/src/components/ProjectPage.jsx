import React, { useState } from "react";
import ProjectSection from "./ProjectSection";
import { projects } from "../utils/projects";

const ProjectPage = () => {
  const [selectedTab, setSelectedTab] = useState("javascript");
  const total_js = projects.javascript.length;
  const total_react = projects.react.length;
  const total_responsive = projects.responsive.length;
  const total = total_js + total_react + total_responsive;

  const tabs = [
    { name: "All (" + `${total}` + ")", key: "all" },
    { name: "React (" + `${total_react}` + ")", key: "react" },
    { name: "JavaScript (" + `${total_js}` + ")", key: "javascript" },
    { name: "HTML/CSS (" + `${total_responsive}` + ")", key: "responsive" },
  ];

  return (
    <div>
      <section className="py-12 text-[var(--text-color)]">
        <div className="container mx-auto text-center">
          {/* <h1 className="text-4xl font-bold mb-8 lexend">Projects</h1> */}
          <div className="flex flex-wrap justify-center gap-4 p-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key)}
                className={`px-4 py-2 mx-2 rounded-md focus:outline-none ${
                  selectedTab === tab.key
                    ? "bg-[var(--primary-color)]"
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
                title="HTML/CSS Projects"
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
              title="HTML/CSS Projects"
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
