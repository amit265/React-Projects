const Hero = () => {
  return (
    <section className="hero-animate -z-10 py-12 lg:py-24 text-[var(--text-color)]">
      <div className="container mx-auto px-4 text-center ">
        <div className="max-w-5xl mx-auto ">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 text-[var(--primary-color)] lexend">
            Welcome to CodeRespite
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-[var(--primary-color)] lexend">Your journey through code, from basics to brilliance.</h2>
          <p className="text-lg lg:text-xl mb-8 text-justify">
            Explore a collection of projects that capture my evolution as a
            developer—from simple HTML/CSS designs to complex React apps using
            React Router, Redux, and backend applications built with Node,
            Express, and MongoDB. Each project can be viewed live with a tap on
            the "Live" button, and the "Code" button reveals the source on
            GitHub. Look forward to technical blogs where I’ll share my insights
            and tackle the challenges of coding.
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
