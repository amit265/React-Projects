import { useState } from "react";

const About = () => {
  const [accord, setAccord] = useState(0);
  const toggleAccordion = (index) => {
    setAccord(accord === index ? null : index)
  }
  return (
    <section className="bg-[var(--background-color)] p-8 text-[var(--text-color)] text-base sm:text-xl text-pretty mx-auto lg:w-1/2 md:w-3/4 w-full">
      <h1 className="text-xl sm:text-2xl font-bold mb-2 text-[var(--primary-color)] bg-[var(--text-color)] p-4 rounded-lg cursor-pointer flex items-center justify-between"  onClick={() => toggleAccordion(0)}>
      <span>Welcome to CodeRespite</span>
      <span className="text-right text-3xl text-[var(--background-color)]">{accord === 0 ? "⇧" : "⇩"}</span>
      </h1>

      <p className={`mb-4 px-2 ${accord === 0 ? "block" : "hidden"}`}>
        At CodeRespite, we embrace the journey of continuous learning and the
        art of building solutions that address real-world challenges. This
        platform goes beyond being a portfolio - it's a chronicle of my evolution
        as a developer. From the early days of simple HTML, CSS, and JavaScript
        projects to sophisticated React applications that seamlessly integrate
        state management with Redux, dynamic routing using React Router, and
        robust backend solutions with Node.js, Express, and MongoDB.
        <br />
        Additionally, my journey includes Android app development, where I've
        explored mobile solutions that bring ideas to life on the go.
        CodeRespite showcases this diverse range of projects, reflecting not
        only my skills but also the learning and growth that has shaped my path
        as a developer.
      </p>
   
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-[var(--primary-color)] bg-[var(--text-color)] p-4 rounded-lg cursor-pointer flex items-center justify-between" onClick={() => toggleAccordion(1)}>
        
        <span>Who Am I?</span>
      <span className="text-right text-3xl text-[var(--background-color)]">{accord === 1 ? "⇧" : "⇩"}</span>
      
      </h2>
      <p className={`mb-4 px-2 ${accord === 1 ? "block" : "hidden"}`}>
        I hold a B.Tech in Computer Science and am passionate about both mobile
        app development and full-stack web development. My skills have evolved
        over time, and I'm always eager to dive into new technologies and
        frameworks, expanding my expertise and pushing the boundaries of what's
        possible with code.
      </p>
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-[var(--primary-color)] bg-[var(--text-color)] p-4 rounded-lg cursor-pointer flex items-center justify-between" onClick={() => toggleAccordion(2)}>
        
        <span>What You'll Find Here</span>
      <span className="text-right text-3xl text-[var(--background-color)]">{accord === 1 ? "⇧" : "⇩"}</span>
     
      </h2>
      <p className={`mb-4 px-2 ${accord === 2 ? "block" : "hidden"}`}>
        On this site, you'll discover a wide array of projects that showcase my
        growth and technical abilities. Each project is a testament to the
        learning process - from the basics to more advanced concepts. You can view
        live demos with just a tap on the "Live" button, and if you're curious
        about the implementation, the "Code" button will take you straight to
        the source on GitHub.
        <br />
        But CodeRespite is not just about my journey. It's a resource for
        students and tech enthusiasts alike. Whether you're looking to find
        inspiration, contribute to open-source projects, or just explore the
        possibilities of coding, there’s something here for everyone.
      </p>
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-[var(--primary-color)] bg-[var(--text-color)] p-4 rounded-lg cursor-pointer flex items-center justify-between" onClick={() => toggleAccordion(3)}>
        
        <span>Our Vision</span>
      <span className="text-right text-3xl text-[var(--background-color)]">{accord === 1 ? "⇧" : "⇩"}</span>
     
      </h2>
      <p className={`mb-4 px-2 ${accord === 3 ? "block" : "hidden"}`}>
        The vision behind CodeRespite is simple: to create a space where my work
        can inspire others, offer learning opportunities, and contribute to the
        vibrant tech community. I want this site to be a beacon for those who
        are on their own coding journey, providing both insights and practical
        examples of what can be achieved with dedication and a love for coding.
      </p>
      <h2 className="text-xl sm:text-2xl font-bold mb-2 text-[var(--primary-color)] bg-[var(--text-color)] p-4 rounded-lg cursor-pointer flex items-center justify-between" onClick={() => toggleAccordion(4)}>
        
        <span>What's Next?</span>
      <span className="text-right text-3xl text-[var(--background-color)]">{accord === 1 ? "⇧" : "⇩"}</span>
     
      </h2>
      <p className={`mb-4 px-2 ${accord === 4 ? "block" : "hidden"}`}>
        Looking ahead, I plan to expand CodeRespite by adding technical blogs
        where I'll share my experiences, challenges, and the solutions I’ve
        discovered along the way. These blogs will dive deep into coding
        concepts, offering valuable insights for both beginners and seasoned
        developers.
      </p>

    </section>
  );
};

export default About;
