import Carousel from "./CarousalProject";
import { projects } from "../utils/constants";

function Projects() {
  return (
    <section id="project" className="sm:min-h-[50vh] sm:py-8 bg-white rounded-lg shadow-lg my-8 w-full lg:w-8/12 mx-auto ">
      <h2 className="text-2xl text-[#323954] sm:text-4xl pt-8 font-semibold text-center">
        Projects ({projects.length})
      </h2>

      <div className="sm:w-8/12 mx-auto flex items-center justify-center ">
        <Carousel projects={projects} />
      </div>
    </section>
  );
}

export default Projects;
