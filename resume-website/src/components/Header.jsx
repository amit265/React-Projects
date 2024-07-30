import { useEffect, useState } from "react";
import download from "../assets/downlaod.png";

function Header() {
  const phrases = ["Web Developer.", "Full-Stack Developer.", "Mobile App Developer."];
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  const [displayedText, setDisplayedText] = useState("");
  const [letterIndex, setLetterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

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
    <header className="text-center sm:h-[50vh] relative">
      <div className="relative flex flex-col pb-16 gap-4 items-center justify-center h-full w-full mx-auto bg-gradient-to-r from-gray-500 via-black to-gray-500">
        <h1 className="text-white text-2xl sm:text-5xl font-bold mt-16">Amit Kumar</h1>
        <h3 className="text-white text-xl sm:text-3xl font-semibold p-4">
        I am a{" "}
        <span className="animate-fade-in-out">{displayedText}</span>
        <span className="blinking-cursor">|</span>
        </h3>
        <a href="https://coderespite.com/doc/amit-resume.pdf" target="_blank">
          <div className="text-white border border-white rounded-3xl p-2 sm:p-4 shadow-lg flex gap-4 hover:bg-gray-300 hover:text-black">
            <img
              className="bg-white rounded-full p-1 w-8 h-8"
              src={download}
              alt=""
            />
            <button className="">Resume</button>
          </div>
        </a>
      </div>
    </header>
  );
}

export default Header;
