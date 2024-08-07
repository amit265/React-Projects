import { FaGithub } from "react-icons/fa";
import { TfiLinkedin } from "react-icons/tfi";
import { FaSquareXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="text-[var(--text-color)] py-6">
      <div className="flex  flex-col justify-center items-center gap-2">
        {/* <div className="flex flex-col items-center justify-center gap-2">
          <h3 className="text-xl font-semibold mb-2">
            Subscribe to our Newsletter
          </h3>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md text-black"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-md text-white"
            >
              Subscribe
            </button>
          </form>
        </div> */}
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="flex gap-2">
            <a
              href="https://x.com/coderespite/"
              className="p-2 rounded-full hover:shadow-lg hover:bg-gray-500"
              target="_blank"

            >
              <FaSquareXTwitter />
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

        <div>
          <p>Made with ❤️ by CodeRespite</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
