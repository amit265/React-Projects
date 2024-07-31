import { useRef } from "react";
import profile from "../assets/profile.jpg";
import linkdin from "../assets/linkedin.png";
import github from "../assets/github.png";
import gmail from "../assets/gmail.png";

function About() {
  return (
    <section id="about" className="flex lg:w-8/12  sm:min-h-[50vh] mx-auto md:flex-row flex-col md:justify-around  items-center  bg-white rounded-lg shadow-lg my-8">
      <div className="flex md:ml-8 sm:w-1/3 flex-col items-center justify-center">
        <img
          className="m-4 h-48 w-48 rounded-full hover:shadow-lg hover:border-gray-400 hover:border-2"
          src={profile}
          alt="amit"
        />
        <div className="flex gap-2">
          <a href="mailto:amitk.kumar414@gmail.com">
            <img
              className="w-12 h-12 p-2 rounded-2xl hover:border-gray-400 hover:border-2 hover:shadow-lg"
              src={gmail}
              alt="gmail"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/amit265/"
            target="_blank"
          >
            <img
              className="w-12 h-12 p-2 rounded-2xl hover:border-gray-400 hover:border-2 hover:shadow-lg"
              src={linkdin}
              alt="linkdin"
            />
          </a>
          <a href="https://github.com/amit265" target="_blank">
            <img
              className="w-12 h-12 p-2 rounded-2xl hover:border-gray-400 hover:border-2 hover:shadow-lg"
              src={github}
              alt="github"
            />
          </a>
        </div>
      </div>
      <div className="flex md:w-2/3 px-4 pb-4 flex-col md:mr-8 sm:px-2 text-[#323954]" >
        <h2 className="text-2xl sm:text-4xl pt-4 px-2 font-semibold sm:mb-4 text-center sm:text-left ">
          About Me
        </h2>
        <p className=" mx-auto text-base sm:text-lg px-2 text-justify pt-4">
          Hi, I'm Amit, a passionate web developer with a knack for
          bringing creative ideas to life. With a background in Computer Science
          and a diverse skill set, I thrive on tackling exciting projects and
          collaborating with innovative minds. Let's connect and
          explore how we can create something amazing together!
        </p>
        <p className=" mx-auto text-base sm:text-lg px-2 text-start pt-4">
          Feel free to check out my work, and connect with me on LinkedIn. I'm
          always ready for new challenges and opportunities.
        </p>
      </div>
    </section>
  );
}

export default About;
