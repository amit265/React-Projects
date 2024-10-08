import { useState } from "react";
import { useSelector } from "react-redux";
import ProjectSection from "./ProjectSection";
import Shimmer from "./Shimmer";
import MyAutocomplete from "./MyAutocomplete";
const ProjectPage = () => {
  const [selectedTab, setSelectedTab] = useState("react");
  const [inputValue, setInputValue] = useState("");
  const projects = useSelector((store) => store?.projects);
  const data = projects.next
    .map((item) => item.title)
    .concat(projects.react.map((item) => item.title))
    .concat(projects.javascript.map((item) => item.title))
    .concat(projects.responsive.map((item) => item.title));
  const [value, setValue] = useState("");

  // Check if the data is still loading or empty
  const isLoading =
    !projects ||
    !projects.javascript ||
    !projects.react ||
    !projects.responsive;
  const isDataEmpty =
    projects?.javascript.length === 0 &&
    projects?.react.length === 0 &&
    projects?.responsive.length === 0;

  const nextjsProject = [...projects.next].sort((a, b) => b.rating - a.rating);

  const reactProject = [...projects.react].sort((a, b) => b.rating - a.rating);

  const javascriptProject = [...projects.javascript].sort(
    (a, b) => b.rating - a.rating
  );
  const responsiveProject = [...projects.responsive].sort(
    (a, b) => b.rating - a.rating
  );

  // Total counts
  const total_js = projects?.javascript?.length || 0;
  const total_react = projects?.react?.length || 0;
  const total_nextjs = projects?.next?.length || 0;
  const total_responsive = projects?.responsive?.length || 0;
  const total = total_js + total_react + total_nextjs + total_responsive;

  // Tabs
  const tabs = [
    { name: "All (" + `${total}` + ")", key: "all" },
    { name: "Nextjs (" + `${total_nextjs}` + ")", key: "nextjs" },
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
    <section className="py-12 text-[var(--text-color)]">
      <div className="flex justify-center pb-4">
        <div className="relative w-80">
          <div className="relative">
            <MyAutocomplete
              value={value}
              setValue={setValue}
              inputValue={inputValue}
              setInputValue={setInputValue}
              data={data}
              searchPlaceholder="Search Projects"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto text-center">
        {/* Tabs */}
        {!value && (
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
        )}

        {value && (
          <div className="flex justify-center">
            <ProjectSection
              title={value}
              projects={[
                ...(projects?.javascript.filter(
                  (item) => item.title === value
                ) || []),
                ...(projects?.responsive.filter(
                  (item) => item.title === value
                ) || []),
                ...(projects?.react.filter((item) => item.title === value) ||
                  []),
                ...(projects?.next.filter((item) => item.title === value) ||
                  []),
              ]}
            />
          </div>
        )}

        {/* Project Sections */}
        {!value && (
          <div>
            {selectedTab === "all" && (
              <>
                <ProjectSection
                  title="Nextjs Projects"
                  projects={nextjsProject}
                />
                <ProjectSection
                  title="React Projects"
                  projects={reactProject}
                />
                <ProjectSection
                  title="JavaScript Projects"
                  projects={javascriptProject}
                />
                <ProjectSection
                  title="HTML/CSS Projects"
                  projects={responsiveProject}
                />
              </>
            )}
            {selectedTab === "nextjs" && (
              <ProjectSection
                title="Nextjs Projects"
                projects={nextjsProject}
              />
            )}
            {selectedTab === "react" && (
              <ProjectSection title="React Projects" projects={reactProject} />
            )}

            {selectedTab === "javascript" && (
              <ProjectSection
                title="JavaScript Projects"
                projects={javascriptProject}
              />
            )}
            {selectedTab === "responsive" && (
              <ProjectSection
                title="HTML/CSS Projects"
                projects={responsiveProject}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectPage;
