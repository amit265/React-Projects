import { projects } from "../utils/projects";
import Hero from "./Hero"; // Import the Hero component
import ProjectSection from "./ProjectSection";

const Home = () => {

    // Function to shuffle and slice array
    const getRandomProjects = (projectArray, count) => {
      // Create a copy of the array to avoid modifying the original
      const shuffled = [...projectArray];
      
      // Shuffle the array using Fisher-Yates algorithm
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      
      // Return the first 'count' elements from the shuffled array
      return shuffled.slice(0, count);
    };
  
    // Get a random 6 projects
    const randomJavaScriptProjects = getRandomProjects(projects.javascript, 6);
  
  return (
    <div>
      <Hero />
      {/* <section className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Feature One</h3>
              <p className="text-gray-600">Description of Feature One.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Feature Two</h3>
              <p className="text-gray-600">Description of Feature Two.</p>
            </div>
            <div className="p-6 border rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Feature Three</h3>
              <p className="text-gray-600">Description of Feature Three.</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">About Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            CodeRespite is dedicated to helping students and new coders by providing high-quality tutorials, engaging projects, and a supportive community.
          </p>
        </div>
      </section> */}

      <section className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <ProjectSection
                title="React Projects"
                projects={projects.react.slice(0, 3)}
                path_root="react/"
                github="JavaScript-Projects/tree/main/"
              />
        </div>
      </section>

      {/* <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">"CodeRespite helped me get started with coding. The tutorials are very easy to follow!"</p>
              <p className="font-semibold">- User One</p>
            </div>
            <div className="p-6 border rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">"The projects are engaging and helped me build my portfolio."</p>
              <p className="font-semibold">- User Two</p>
            </div>
            <div className="p-6 border rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">"Great community support and resources."</p>
              <p className="font-semibold">- User Three</p>
            </div>
          </div>
        </div>
      </section> */}

      <section className="bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <ProjectSection
                title="JavaScript Projects"
                projects={randomJavaScriptProjects}
                path_root="js-projects/"
                github="JavaScript-Projects/tree/main/"
                />
        </div>
      </section>


      

      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Become a part of our community to get access to exclusive content,
            tutorials, and more.
          </p>
          <a
            href="#signup"
            className="px-6 py-3 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-700"
          >
            Sign Up Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
