import React, { useState } from "react";
import logo from "../assets/images/logo.jpg";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [login, setLogin] = useState("Login");

  const onlineStatus = useOnlineStatus();
  console.log(onlineStatus + "amit");

  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="links">
        <ul>
          <li className="hover:bg-gray-400 p-2 rounded-lg hover:shadow-lg">
            Online Status: {onlineStatus ? "💚" : "🔴"}
          </li>
          <li className="hover:bg-gray-400 p-2 rounded-lg hover:shadow-lg">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="hover:bg-gray-400 p-2 rounded-lg hover:shadow-lg">
            <Link to={"/about"}>About</Link>
          </li>
          <li className="hover:bg-gray-400 p-2 rounded-lg hover:shadow-lg">
            <Link to={"/contact"}>Contact</Link>
          </li>
          <li className="hover:bg-gray-400 p-2 rounded-lg hover:shadow-lg"
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
