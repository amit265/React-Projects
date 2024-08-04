const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
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

        <div className="flex flex-row gap-2">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            GitHub
          </a>
        </div>

        <div className="text-gray-400">
          <p>Made with ❤️ by CodeRespite</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
