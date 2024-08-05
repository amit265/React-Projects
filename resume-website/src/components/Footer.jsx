import { FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { TfiLinkedin } from "react-icons/tfi";

function Footer() {
  return (
    <footer className="w-full bg-[#323954] text-[#fefffa] p-4 text-center">
      <div className="mx-auto p-2 sm:w-8/12">
        <h1 className="text-base md:text-xl w-full lg:w-6/12 mx-auto">
          {" "}
          I'm always thrilled to dive into exciting projects. Let's connect and
          explore how we can collaborate!{" "}
        </h1>
        <div className="flex flex-col gap-4 md:flex-row justify-around items-center p-4 m-4">
          <div>
            <h1 className="text-center text-lg">Amit Kumar</h1>
            {/* &copy; {new Date().getFullYear()} */}
            <a className="hover:text-blue-600" href="https://coderespite.com/">
              <p>https://coderespite.com/</p>
            </a>
          </div>
          {/* <div className="md:block sm:items-center sm:flex flex-col gap-2 justify-start items-start">
            <h1 className="font-bold text-lg">No copyright issues.</h1>
            <p className="">
              Feel free to copy. If you need any help, ping me !{" "}
            </p>
          </div> */}
          <div className="flex flex-col gap-2 items-center justify-center">
            <h1>You can find me everywhere</h1>
            <div className="flex gap-2">
              <a
                href="mailto:amit@coderespite.com"
                className="p-2 rounded-full hover:shadow-lg hover:bg-gray-500"
              >
                <SiGmail />
              </a>
              <a
                href="https://www.linkedin.com/in/amit265/"
                className="p-2 rounded-full hover:shadow-lg hover:bg-gray-500"
                target="_blank"
              >
                <TfiLinkedin />
              </a>
              <a
                href="https://github.com/amit265"
                className="p-2 rounded-full hover:shadow-lg hover:bg-gray-500"
                target="_blank"
              >
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p>Made with ❤️ in India</p>
      </div>
    </footer>
  );
}

export default Footer;
