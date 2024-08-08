import { useState } from "react";
import Hamburger from "hamburger-react";
import { Link } from "react-router-dom";
import useProjects from "../hooks/useProject";

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  useProjects("responsive");
  useProjects("javascript");

  useProjects("react");
  const falseHam = () => {
    setOpen(false);
  };

  return (
    <header className="flex flex-col md:flex-row md:justify-between md:items-center p-4 text-[var(--text-color)] header-animate">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[var(--primary-color)] flex items-center lexend">
            <span className="text-[var(--text-color)] text-3xl sm:text-4xl md:text-5xl">
              {"<"}
            </span>
            <span className="flex items-center pt-1">
              <span className="text-[#ef233c] text-xl sm:text-2xl md:text-3xl">
                CODE
              </span>
              <span className="text-xl text-[var(--text-color)] sm:text-2xl md:text-3xl">
                RESPITE
              </span>
            </span>
            <span className="text-yellow-500 text-xl sm:text-2xl md:text-3xl pt-0.5">
              /
            </span>
            <span className="text-[#ef233c] text-3xl sm:text-4xl md:text-5xl">
              {">"}
            </span>
          </h1>
          <h3 className="text-xs sm:text-base mt-1">
            REFRESH YOUR TECH SKILLS
          </h3>
        </div>

        <div className="md:hidden pr-4">
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
      </div>

      <nav
        className={`flex-col md:flex md:flex-row md:items-center md:gap-4 ${
          isOpen ? "flex " : "hidden"
        }`}
      >
        <ul className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-4 md:mt-0 ">
          <Link to={"/"}>
            <li
              onClick={falseHam}
              className="py-2 px-4 hover:text-[var(--background-color)] hover:bg-[var(--text-color)] text-lg rounded-md cursor-pointer"
            >
              Home
            </li>
          </Link>
          {/* <Link to={"/blogs"}><li onClick={falseHam} className="py-2 px-4 hover:bg-gray-600 hover:text-white text-lg rounded-md cursor-pointer">
            Blogs
          </li></Link> */}
          <Link to={"/project"}>
            <li
              onClick={falseHam}
              className="py-2 px-4 hover:text-[var(--background-color)] hover:bg-[var(--text-color)] text-lg rounded-md cursor-pointer"
            >
              Projects
            </li>
          </Link>
          <Link to={"/about"}>
            <li
              onClick={falseHam}
              className="py-2 px-4 hover:text-[var(--background-color)] hover:bg-[var(--text-color)] text-lg rounded-md cursor-pointer"
            >
              About
            </li>
          </Link>
          <Link to={"/contact"}>
            <li
              onClick={falseHam}
              className="py-2 px-4 hover:text-[var(--background-color)] hover:bg-[var(--text-color)] text-lg rounded-md cursor-pointer"
            >
              Contact
            </li>
          </Link>
          {/* <Link to={"/login"}>
            <li
              onClick={falseHam}
              className="py-2 px-4 hover:text-[var(--background-color)] hover:bg-[var(--text-color)] text-lg rounded-md cursor-pointer"
            >
              Admin
            </li>
          </Link> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
