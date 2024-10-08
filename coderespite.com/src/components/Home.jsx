import { Link } from "react-router-dom";
import Hero from "./Hero";
import ProjectSection from "./ProjectSection";
import { useSelector } from "react-redux";
import ShimmerHome from "./ShimmerHome";
import BlogsSection from "./BlogsSection";

const Home = () => {
  // const [visibleProjects, setVisibleProjects] = useState([]);

  const projects = useSelector((store) => store?.projects);

  const blogs = useSelector((store) => store?.blogs?.blogs);
  const isLoading =
    projects?.javascript.length === 0 &&
    projects?.react.length === 0 &&
    projects?.responsive.length === 0 &&
    projects?.next.length === 0;
  // useEffect(() => {
  //   const updateProjectVisibility = () => {
  //     const screenWidth = window.innerWidth;
  //     const isLargeScreen = screenWidth >= 1024; // Tailwind's lg breakpoint is 1024px

  //     if (isLargeScreen) {
  //       setVisibleProjects(shuffleArray([...projects.javascript]));
  //     } else {
  //       setVisibleProjects(shuffleArray([...projects.javascript]).slice(0, 5));
  //     }
  //   };

  //   // Set initial number of projects based on current screen size
  //   updateProjectVisibility();

  //   // Update the number of visible projects on window resize
  //   window.addEventListener("resize", updateProjectVisibility);

  //   // Cleanup the event listener on component unmount
  //   return () => window.removeEventListener("resize", updateProjectVisibility);
  // }, [projects]);

  const reactProject = [...projects.react]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
  const javascriptProject = [...projects.javascript]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
  const blogProject = [...blogs]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
  const nextProject = [...projects.next]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div className="text-[var(--text-color)]">
      <Hero />

      {blogs.length > 0 && (
        <section className="py-8">
          <div className="container mx-auto sm:px-4">
            <Link to={"/project"}>
              <h2 className="text-center text-3xl font-bold mb-2 text-[var(--primary-color)] hover:text-[var(--text-color)] lexend">
                Blogs
              </h2>
            </Link>

            <div>
              {!isLoading ? (
                <div>
                  <BlogsSection
                    blogs={blogProject}
                    horizontalScroll={true}
                    animation={false}
                  />
                  <Link to={"/project"}>
                    {" "}
                    <h1 className="text-right mr-16 text-[var(--text-color)] hover:text-[var(--primary-color)]">
                      more...
                    </h1>
                  </Link>
                </div>
              ) : (
                <ShimmerHome isLoading={isLoading} />
              )}
            </div>
          </div>
        </section>
      )}

      {nextProject.length > 0 && <section className="py-8">
        <div className="container mx-auto sm:px-4 text-center">
          <Link to={"/project"}>
            <h2 className="text-3xl font-bold text-[var(--primary-color)] hover:text-[var(--text-color)] lexend">
              Next.js Projects
            </h2>
          </Link>

          <div>
            {!isLoading ? (
              <div>
                <ProjectSection
                  projects={nextProject}
                  horizontalScroll={true}
                  animation={false}
                />
                <Link to={"/project"}>
                  {" "}
                  <h1 className="text-right mr-16 text-[var(--text-color)] hover:text-[var(--primary-color)]">
                    more...
                  </h1>
                </Link>
              </div>
            ) : (
              <ShimmerHome isLoading={isLoading} />
            )}
          </div>
        </div>
      </section>}

      <section className="py-8">
        <div className="container mx-auto sm:px-4 text-center">
          <Link to={"/project"}>
            <h2 className="text-3xl font-bold text-[var(--primary-color)] hover:text-[var(--text-color)] lexend">
              React Projects
            </h2>
          </Link>

          <div>
            {!isLoading ? (
              <div>
                <ProjectSection
                  projects={reactProject}
                  horizontalScroll={true}
                  animation={false}
                />
                <Link to={"/project"}>
                  {" "}
                  <h1 className="text-right mr-16 text-[var(--text-color)] hover:text-[var(--primary-color)]">
                    more...
                  </h1>
                </Link>
              </div>
            ) : (
              <ShimmerHome isLoading={isLoading} />
            )}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto sm:px-4 text-center">
          <Link to={"/project"}>
            <h2 className="text-3xl font-bold text-[var(--primary-color)] hover:text-[var(--text-color)] lexend">
              JavaScript Projects
            </h2>
          </Link>

          <div>
            {!isLoading ? (
              <div>
                <ProjectSection
                  projects={javascriptProject}
                  horizontalScroll={true}
                  animation={false}
                />
                <Link to={"/project"}>
                  <h1 className="text-right mr-16 text-[var(--text-color)] hover:text-[var(--primary-color)]">
                    more...
                  </h1>
                </Link>
              </div>
            ) : (
              <ShimmerHome />
            )}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[var(--primary-color)] lexend">
            Let's Connect!
          </h2>
          <p className="text-lg max-w-2xl mx-auto mb-6">
            Have something to share or want to hire me for a project? I’d love
            to hear from you.
          </p>
          <Link
            to={"/contact"}
            className="px-6 py-3 bg-[var(--primary-color)] text-lg rounded-md hover:bg-[#ef231a]"
          >
            Contact Me
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
