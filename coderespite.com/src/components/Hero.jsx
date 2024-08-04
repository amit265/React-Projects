import React from "react";

const Hero = () => {
  return (
    <section className="bg-gray-100 py-12 lg:py-24">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Welcome to CodeRespite
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 mb-8">
            Your one-stop platform for coding tutorials, projects, and community support. Empowering students and new coders to learn, grow, and succeed.
          </p>
          <div className="flex justify-center gap-4">
            {/* <a
              href="#get-started"
              className="px-6 py-3 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-700"
            >
              Get Started
            </a>
            <a
              href="#learn-more"
              className="px-6 py-3 bg-gray-300 text-gray-800 text-lg rounded-md hover:bg-gray-400"
            >
              Learn More
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
