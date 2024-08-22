import { useState } from "react";
import MyAutocomplete from "./MyAutocomplete";
import { useSelector } from "react-redux";
import ProjectSection from "./ProjectSection";
import BlogsSection from "./BlogsSection";

const Hero = () => {
  const [inputValue, setInputValue] = useState("");
  const blogs = useSelector((store) => store?.blogs?.blogs);
  const projects = useSelector((store) => store?.projects);
  const data = projects.javascript
    .map((item) => item.title)
    .concat(projects.react.map((item) => item.title))
    .concat(projects.responsive.map((item) => item.title))
    .concat(blogs.map((blog) => blog.title));
  const [value, setValue] = useState("");

  return (
    <section className="hero-animate -z-10 py-4 lg:pt-12 text-[var(--text-color)]">
      <div className="container mx-auto px-4 text-center ">
        <div className="max-w-5xl mx-auto ">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 text-[var(--primary-color)] lexend">
            Welcome to CodeRespite
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-[var(--primary-color)] lexend">
            Your journey through code, from basics to brilliance.
          </h2>

          <div className="flex flex-col justify-center items-center p-8">
            <div className="relative w-full text-left">
              <MyAutocomplete
                value={value}
                setValue={setValue}
                inputValue={inputValue}
                setInputValue={setInputValue}
                data={data}
                searchPlaceholder = "Search Projects/Blogs"
              />
            </div>
            <div className="flex items-center gap-4">
            {value && (
                <div className="flex flex-col gap-8 justify-center">
                  <ProjectSection
                    projects={[
                      ...(projects?.javascript.filter(
                        (item) => item.title === value
                      ) || []),
                      ...(projects?.responsive.filter(
                        (item) => item.title === value
                      ) || []),
                      ...(projects?.react.filter((item) => item.title === value) ||
                        []),
                    ]}
                  />

                  {/* Blog Section */}
                  <BlogsSection
                    blogs={blogs.filter((blog) => blog.title === value)}
                  />
                </div>
              )}
            </div>
          </div>

          {!value && (
            <p className="text-lg lg:text-xl mb-8 text-justify">
              Explore a collection of projects that capture my evolution as a
              developer—from simple HTML/CSS designs to complex React apps using
              React Router, Redux, and backend applications built with Node,
              Express, and MongoDB. Each project can be viewed live with a tap
              on the "Live" button, and the "Code" button reveals the source on
              GitHub. Look forward to technical blogs where I’ll share my
              insights and tackle the challenges of coding.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
