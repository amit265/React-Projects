import React, { useState } from "react";
import Hamburger from "hamburger-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setOpen] = useState(false);

  const falseHam = () => {
    setOpen(false);
  };

  return (
    <header className="flex flex-col md:flex-row md:justify-between md:items-center p-4 bg-gray-800 text-white">
      <div className="flex justify-between items-center">
        <div className="flex flex-col items-center">
          {/* <img
            src="/public/flame.png"
            className="w-12 h-12 md:w-16 md:h-16"
            alt="Logo"
          /> */}
          <h1 className="ml-4 text-xl md:text-2xl">CodeRespite</h1>
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
              className="py-2 px-4 hover:bg-gray-600 hover:text-white text-lg rounded-md cursor-pointer"
            >
              Home
            </li>
          </Link>
          {/* <Link to={"/blogs"}><li onClick={falseHam} className="py-2 px-4 hover:bg-gray-600 hover:text-white text-lg rounded-md cursor-pointer">
            Blogs
          </li></Link> */}
          <Link to={"/projects"}>
            <li
              onClick={falseHam}
              className="py-2 px-4 hover:bg-gray-600 hover:text-white text-lg rounded-md cursor-pointer"
            >
              Projects
            </li>
          </Link>
          <Link to={"/about"}>
            <li
              onClick={falseHam}
              className="py-2 px-4 hover:bg-gray-600 hover:text-white text-lg rounded-md cursor-pointer"
            >
              About
            </li>
          </Link>
          <Link to={"/contact"}>
            <li
              onClick={falseHam}
              className="py-2 px-4 hover:bg-gray-600 hover:text-white text-lg rounded-md cursor-pointer"
            >
              Contact
            </li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
