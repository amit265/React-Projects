import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import Hamburger from "hamburger-react";

function Header() {
  const phrases = [
    "Web Developer.",
    "Full Stack Developer.",
    "Mobile App Developer.",
  ];

  const [isOpen, setOpen] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  const [displayedText, setDisplayedText] = useState("");
  const [letterIndex, setLetterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const handleHam = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // md breakpoint is 768px in Tailwind CSS
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Call handleResize initially to ensure the correct state on load
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let timeout;
    if (!isDeleting && letterIndex < currentPhrase.length) {
      timeout = setTimeout(() => {
        setDisplayedText(displayedText + currentPhrase[letterIndex]);
        setLetterIndex(letterIndex + 1);
      }, 100);
    } else if (isDeleting && letterIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentPhrase.substring(0, letterIndex - 1));
        setLetterIndex(letterIndex - 1);
      }, 100);
    } else if (!isDeleting && letterIndex === currentPhrase.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 3000);
    } else if (isDeleting && letterIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((phraseIndex + 1) % phrases.length);
      setCurrentPhrase(phrases[(phraseIndex + 1) % phrases.length]);
    }
    return () => clearTimeout(timeout);
  }, [currentPhrase, displayedText, isDeleting, letterIndex, phraseIndex]);

  return (
    <header className="text-center bg-[#323954]">
      <div className="lg:w-8/12 mx-auto">
        <div className="flex flex-col md:flex-row justify-between px-4 pb-10 sm:p-8">
          <div className="flex justify-end">
            <div className="p-4 md:hidden">
              <Hamburger color="#fefffa" toggled={isOpen} toggle={setOpen} />
            </div>
          </div>
          <nav
            className={`${
              isOpen
                ? "absolute top-20 right-0 w-1/4 mx-auto bg-[#323954] z-10"
                : ""
            }`}
          >
            <ul
              className={`flex text-[#fefffa] flex-col md:flex-row justify-center md:space-x-4 ${
                isOpen ? "block" : "hidden md:flex"
              }`}
            >
              <Link to="about" smooth={true} duration={500}>
                <li
                  onClick={handleHam}
                  className="w-24 mx-auto mr-4 mt-2 cursor-pointer px-4 py-2 rounded-md hover:bg-[#fefffa] hover:text-[#323954]"
                >
                  About
                </li>
              </Link>
              <Link to="project" smooth={true} duration={600}>
                <li
                  onClick={handleHam}
                  className="w-24 ml-auto mr-4 mt-2 cursor-pointer px-4 py-2 rounded-md hover:bg-[#fefffa] hover:text-[#323954]"
                >
                  Project{" "}
                </li>
              </Link>
              <Link to="skill" smooth={true} duration={900}>
                <li
                  onClick={handleHam}
                  className="w-24 ml-auto mr-4 mt-2 cursor-pointer px-4 py-2 rounded-md hover:bg-[#fefffa] hover:text-[#323954]"
                >
                  Skill{" "}
                </li>
              </Link>
              <Link to="certificate" smooth={true} duration={1000}>
                <li
                  onClick={handleHam}
                  className="w-24 ml-auto mr-4 mt-2 cursor-pointer px-4 py-2 rounded-md hover:bg-[#fefffa] hover:text-[#323954]"
                >
                  Certificate{" "}
                </li>
              </Link>
              <li
                onClick={handleHam}
                className="w-24 ml-auto mr-4 mt-2 cursor-pointer px-4 py-2 rounded-md bg-[#ea5147] hover:bg-[#fefffa] hover:text-[#323954]"
              >
                <a
                  href="https://coderespite.com/doc/amit-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-2 items-start justify-end px-8 pb-8">
          <h1 className="libre-baskerville-bold text-[#fefffa] text-2xl sm:text-3xl md:text-5xl font-bold mt-16">
            Hello, I'm
          </h1>
          <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#ea5147]">
            Amit Kumar
          </h1>
          <h3 className="text-[#fefffa] text-xl sm:text-2xl md:text-3xl font-semibold">
            I am a <span className="animate-fade-in-out">{displayedText}</span>
            <span className="blinking-cursor">|</span>
          </h3>
        </div>
      </div>
    </header>
  );
}

export default Header;
