import profile from "../assets/profile.jpg";
import linkdin from "../assets/linkedin.png";
import github from "../assets/github.png";
import gmail from "../assets/gmail.png";

function About() {
  return (
    <section className="flex sm:w-8/12  sm:h-[50vh] mx-auto sm:flex-row flex-col sm:justify-around  items-center ">
      <div className="flex sm:w-1/3 flex-col items-center justify-center">
        <img className="m-4 h-48 w-48 rounded-full" src={profile} alt="amit" />
        <div className="flex gap-2 m-4">
        <a href="mailto:amitk.kumar414@gmail.com"><img className="w-10 h-10 rounded-2xl" src={gmail} alt="gmail" /></a>
          <a href="https://www.linkedin.com/in/amit-kumar-96805a130/" target="_blank"><img className="w-10 h-10 rounded-2xl" src={linkdin} alt="linkdin" /></a>
          <a href="https://github.com/amit265" target="_blank"><img className="w-10 h-10 rounded-xl" src={github} alt="github" /></a>
        </div>
      </div>
      <div className="flex  sm:w-2/3 flex-col p-4">
        <h2 className="sm:text-5xl text-3xl font-medium text-center sm:text-left mb-4 ">About Me</h2>
        <p className=" mx-auto text-lg text-start pt-4 text-gray-600">
          Hi! I am a passionate Full Stack Web Developer
          specializing in front-end development with React. My projects showcase
          expertise in JavaScript, React, and state management. 
          </p>
          <p className=" mx-auto text-lg text-start pt-4 text-gray-600">
          I have completed
          the Namaste React course, mastering React concepts through intensive
          projects. Additionally, I am proficient in Node.js, Express, and
          MongoDB, enabling me to create full-stack solutions. Explore my work
          to see my skills in action!
        </p>
      </div>
    </section>
  );
}

export default About;
