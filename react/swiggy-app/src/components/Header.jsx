import React, { useState } from "react";
import logo from "../assets/images/logo.jpg";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";

const Header = () => {
  const [login, setLogin] = useState("Login");

  const onlineStatus = useOnlineStatus();

  //subscribing to the store using selector
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="bg-white dark:bg-gray-800"> 
    <div className="mb-4 flex flex-col sm:flex-row justify-between items-center sm:w-10/12 sm:mx-auto">
      <div className="w-20 pt-4 pb-2">
        <img className="rounded-full" src={logo} alt="logo" />
      </div>
      <div>
        <ul className="sm:flex gap-0 sm:gap-4 p-2 sm:p-4 items-center flex justify-between text-gray-700 dark:text-gray-400">
          <li className="hover:bg-gray-400 hover:text-white p-2 rounded-lg hover:shadow-lg">
            {onlineStatus ? "💚" : "💔"}
          </li>
          <li className="hover:bg-gray-400 hover:text-white p-2 rounded-lg hover:shadow-lg">
            <Link to={BASE_URL + "/"}>Home</Link>
          </li>
          <li className="hover:bg-gray-400 p-2 hover:text-white rounded-lg hover:shadow-lg">
            <Link to={BASE_URL + "/about"}>About</Link>
          </li>
          <li className="hover:bg-gray-400 p-2 hover:text-white rounded-lg hover:shadow-lg">
            <Link to={BASE_URL + "/contact"}>Contact</Link>
          </li>
          <li
            className="hover:bg-gray-400 hover:text-white cursor-pointer p-2 rounded-lg hover:shadow-lg "
            onClick={() => {
              login === "Login" ? setLogin("Logout") : setLogin("Login");
            }}
          >
            {login}
          </li>
          <li className="hover:bg-gray-400 p-2 hover:text-white rounded-lg hover:shadow-lg font-bold text-xl">
            <Link className="relative inline-block" to={BASE_URL + "/cart"}>
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
