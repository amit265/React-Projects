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

  console.log("amit", cartItems);

  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="links">
        <ul>
          <li className="hover:bg-gray-400 p-2 rounded-lg hover:shadow-lg">
            Online Status: {onlineStatus ? "💚" : "💔"}
          </li>
          <li className="hover:bg-gray-400 p-2 rounded-lg hover:shadow-lg">
            <Link to={BASE_URL+"/"}>Home</Link>
          </li>
          <li className="hover:bg-gray-400 p-2 rounded-lg hover:shadow-lg">
            <Link to={BASE_URL+"/about"}>About</Link>
          </li>
          <li className="hover:bg-gray-400 p-2 rounded-lg hover:shadow-lg">
            <Link to={BASE_URL+"/contact"}>Contact</Link>
          </li>
          <li className="hover:bg-gray-400 p-2 rounded-lg hover:shadow-lg font-bold text-xl">
            <Link className="relative inline-block" to={BASE_URL+"/cart"}>
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
          <li
            className="hover:bg-gray-400 p-2 rounded-lg hover:shadow-lg "
            onClick={() => {
              login === "Login" ? setLogin("Logout") : setLogin("Login");
            }}
          >
            {login}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
