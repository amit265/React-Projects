import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProjectSection from "./ProjectSection";
import Shimmer from "./Shimmer";

const ProjectPage = () => {
  const [selectedTab, setSelectedTab] = useState("javascript");
  const projects = useSelector((store) => store?.projects);

  // Check if the data is still loading or empty
  const isLoading = !projects || !projects.javascript || !projects.react || !projects.responsive;
  const isDataEmpty = (projects?.javascript.length === 0 && 
                        projects?.react.length === 0 && 
                        projects?.responsive.length === 0);

  // Total counts
  const total_js = projects?.javascript?.length || 0;
  const total_react = projects?.react?.length || 0;
  const total_responsive = projects?.responsive?.length || 0;
  const total = total_js + total_react + total_responsive;

  // Tabs
  const tabs = [
    { name: "All (" + `${total}` + ")", key: "all" },
    { name: "React (" + `${total_react}` + ")", key: "react" },
    { name: "JavaScript (" + `${total_js}` + ")", key: "javascript" },
    { name: "HTML/CSS (" + `${total_responsive}` + ")", key: "responsive" },
  ];

  if (isLoading || isDataEmpty) {
    return (
      <div className="py-12 pt-24 text-center">
        <Shimmer />
      </div>
    );
  }

  return (
    <div>
      <section className="py-12 text-[var(--text-color)]">
        <div className="container mx-auto text-center">
          {/* Tabs */}
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

          {/* Project Sections */}
          {selectedTab === "all" && (
            <>
              <ProjectSection
                title="React Projects"
                projects={projects.react}
              />
              <ProjectSection
                title="JavaScript Projects"
                projects={projects.javascript}
              />
              <ProjectSection
                title="HTML/CSS Projects"
                projects={projects.responsive}
              />
            </>
          )}
          {selectedTab === "react" && (
            <ProjectSection
              title="React Projects"
              projects={projects.react}
            />
          )}
          {selectedTab === "javascript" && (
            <ProjectSection
              title="JavaScript Projects"
              projects={projects.javascript}
            />
          )}
          {selectedTab === "responsive" && (
            <ProjectSection
              title="HTML/CSS Projects"
              projects={projects.responsive}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectPage;
