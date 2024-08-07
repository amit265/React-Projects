import { Link } from "react-router-dom";
import { projects } from "../utils/projects";
import Hero from "./Hero";
import ProjectSection from "./ProjectSection";
import { useEffect, useState } from "react";

const Home = () => {

  const [visibleProjects, setVisibleProjects] = useState([]);

  useEffect(() => {
    const updateProjectVisibility = () => {
      const screenWidth = window.innerWidth;
      const isLargeScreen = screenWidth >= 1024; // Tailwind's lg breakpoint is 1024px

      if (isLargeScreen) {
        setVisibleProjects(projects.javascript);
        
      } else {
        setVisibleProjects(projects.javascript.slice(0, 10));

      }
    };
   
    
    // Set initial number of projects based on current screen size
    updateProjectVisibility();

    // Update the number of visible projects on window resize
    window.addEventListener("resize", updateProjectVisibility);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", updateProjectVisibility);
  }, []);

 

  return (
    <div className="text-[var(--text-color)] hero-animate">
      <Hero />

      <section className="py-12">
        <div className="container mx-auto sm:px-4 text-center">
          <Link to={"/project"}>
            <h2 className="text-3xl font-bold mb-6 text-[var(--primary-color)] hover:text-[#ef233c] lexend">
              React Projects
            </h2>
          </Link>

          <div className="overflow-x-auto scroll-container">
            <ProjectSection
              projects={projects.react}
              path_root="react/"
              github="React-Projects/tree/main/"
              horizontalScroll={true}
              animation = {true}

            />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto sm:px-4 text-center">
          <Link to={"/project"}>
            <h2 className="text-3xl font-bold mb-6 text-[var(--primary-color)] hover:text-[#ef233c] lexend">
              JavaScript Projects
            </h2>
          </Link>

          <div className="overflow-x-auto scroll-container">
            <ProjectSection
              projects={visibleProjects}
              path_root="js-projects/"
              horizontalScroll={true}
              animation = {true}


              github="JavaScript-Projects/tree/main/"
            />
          </div>
         
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[var(--primary-color)] lexend">Join Our Community</h2>
          <p className="text-lg max-w-2xl mx-auto mb-6">
            Become a part of our community to get access to exclusive content.
          </p>
          <a
            href="#signup"
            className="px-6 py-3 bg-[var(--primary-color)] text-lg rounded-md hover:bg-[#ef231a]"
          >
            Sign Up Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
