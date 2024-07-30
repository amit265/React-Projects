import React from "react";
import linkdin from "../assets/linkedin.png";
import github from "../assets/github.png";
import gmail from "../assets/gmail.png";

function Footer() {
  return (
    <footer className="w-full bg-gray-700 text-white p-4 text-center">
      <div className="mx-auto p-2">
        <h1 className="text-base md:text-xl w-full lg:w-4/12 mx-auto">
          {" "}
          I'm always thrilled to dive into exciting projects. Let's connect and explore how we can collaborate!{" "}
        </h1>
        <div className="flex flex-col gap-4 md:flex-row justify-around items-center p-4 m-4">
          <div className="hidden md:block flex flex-col gap-2 justify-start items-start">
            <h1 className="font-bold text-lg">No copyright issues.</h1>
            <p className="">
              Feel free to copy. If you need any help, ping me !{" "}
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <h1>You can find me everywhere</h1>
            <div className="flex gap-2">
              <a href="mailto:amitk.kumar414@gmail.com">
                <img
                  className="w-12 h-12 p-2 rounded-2xl hover:border-gray-400 hover:border-2 hover:shadow-lg"
                  src={gmail}
                  alt="gmail"
                />
              </a>
              <a
                href="https://www.linkedin.com/in/amit-kumar-96805a130/"
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
        </div>
      </div>
      <div className="flex flex-col gap-2">
      <h1 className="text-center text-lg font-mono">Amit Kumar</h1>
      {/* &copy; {new Date().getFullYear()} */}
      <a className="hover:text-blue-600" href="https://coderespite.com/"><p>https://coderespite.com/</p></a>
      <p>Made with ❤️ in India</p>
      </div>
    </footer>
  );
}

export default Footer;
