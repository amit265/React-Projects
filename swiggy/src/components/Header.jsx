import React, { useState } from "react";
import logo from "../assets/images/logo.jpg";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import hamMenu from "../../public/menu.png";

const Header = () => {
  const [login, setLogin] = useState("Login");
  const [hamMenuIcon, setHamMenuIcon] = useState(false)

  const onlineStatus = useOnlineStatus();

  //subscribing to the store using selector
  const cartItems = useSelector((store) => store.cart.items);

  const handleHamMenu = () => {
    setHamMenuIcon(!hamMenuIcon);

  }

  const hamMenuSetFalse = () => {
    setHamMenuIcon(false);
  }

  return (
    <div className="bg-white dark:bg-gray-800"> 
    <div className="mb-4 flex flex-col sm:flex-row justify-between items-center sm:w-10/12 sm:mx-auto">
      <div className="w-full p-4 flex justify-between ">
        <img className="rounded-full w-20 ml-2" src={logo} alt="logo" />
        <img className="cursor-pointer sm:hidden w-12 h-12 rounded-lg p-2 bg-white m-4" src={hamMenu} alt="hamMenu" onClick={handleHamMenu} />
      </div>
      <div>
        <ul className={`sm:flex sm:gap-4 sm:p-4 text-gray-700 dark:text-gray-400 sm:items-center "  ${hamMenuIcon ? "p-2 items-center gap-0 flex flex-col justify-between text-white font-semibold text-lg" : "hidden"}`}>
          <li onClick={hamMenuSetFalse} className="cursor-pointer hover:bg-gray-400 hover:text-white p-2 rounded-lg hover:shadow-lg">
            {hamMenuIcon && "Online Status: "} {onlineStatus ? "💚" : "💔"}
          </li>
          <li onClick={hamMenuSetFalse} className="hover:bg-gray-400 hover:text-white p-2 rounded-lg hover:shadow-lg">
            <Link to={BASE_URL + "/"}>Home</Link>
          </li>
          <li onClick={hamMenuSetFalse} className="hover:bg-gray-400 p-2 hover:text-white rounded-lg hover:shadow-lg">
            <Link to={BASE_URL + "/about"}>About</Link>
          </li>
          <li onClick={hamMenuSetFalse} className="hover:bg-gray-400 p-2 hover:text-white rounded-lg hover:shadow-lg">
            <Link to={BASE_URL + "/contact"}>Contact</Link>
          </li>
          <li
            className="hover:bg-gray-400 hover:text-white cursor-pointer p-2 rounded-lg hover:shadow-lg "
            onClick={() => {
              login === "Login" ? setLogin("Logout") : setLogin("Login");
              hamMenuSetFalse();
            }}
          >
            {login}
          </li>
          <li className="hover:bg-gray-400 p-2 hover:text-white rounded-lg hover:shadow-lg font-bold text-xl">
            <Link onClick={hamMenuSetFalse} className="relative inline-block" to={BASE_URL + "/cart"}>
              <div className="w-10">
                <img
                  className="w-full bg-red-800 rounded-lg"
                  src="shopping-bag.png"
                  alt="shopping-bag"
                />
              </div>
              <span className="absolute bottom-0 right-2 text-white rounded-full text-s pr-1">
                {cartItems.length}
              </span>
            </Link>
          </li>
         
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Header;
