import React, { useMemo, useState } from "react";
import LogoutButton from "../auth/LogoutButton";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import home_icon from "../../assets/images/home.png";
import profile_icon from "../../assets/images/single_user.png";
import setting_icon from "../../assets/images/setting.png";
import leaderboard_icon from "../../assets/images/leaderboard.png";

const Header = () => {
  const [menuSelected, setMenuSelected] = useState("Home");
  const menuItems = ["Home", "Profile", "Leaderboard", "Setting"];
  const { isAuthenticated, user } = useSelector((store) => store.auth);
  // console.log("user", user);
  const handleMenu = (menuItem) => {
    setMenuSelected(menuItem);
  };
  return (
    <div className="flex p-4 -m-4 flex-col justify-center items-center rounded-b-2xl bg-white text-blue-600">
      <div className="flex justify-center w-full">
        <Link to={BASE_URL + "/"} className="w-1/4">
          <div
            className={`flex flex-col items-center justify-center ${
              menuSelected === "Home" ? "text-[#ffcc01]" : ""
            } `}
            onClick={() => handleMenu("Home")}
          >
            <img src={home_icon} alt="home" />

            <h2 className="px-4 py-2 rounded-md text-center cursor-pointer ">
              Home
            </h2>
          </div>
        </Link>

        <Link to={BASE_URL + "/profile"} className="w-1/4">
          <div
            className={`flex flex-col items-center justify-center ${
              menuSelected === "Profile" ? "text-[#ffcc01]" : ""
            } `}
            onClick={() => handleMenu("Profile")}
          >
            <img src={profile_icon} alt="profile" />

            <h2 className="px-4 py-2 rounded-md text-center cursor-pointer">
              Profile
            </h2>
          </div>
        </Link>
        <Link to={BASE_URL + "/leaderboard"} className="w-1/4">
          <div
            className={`flex flex-col items-center justify-center ${
              menuSelected === "Leaderboard" ? "text-[#ffcc01]" : ""
            } `}
            onClick={() => handleMenu("Leaderboard")}
          >
            <img src={leaderboard_icon} alt="leaderboard" />

            <h2 className="px-4 py-2 rounded-md text-center cursor-pointer">
              Leaderboard
            </h2>
          </div>
        </Link>

        <Link to={BASE_URL + "/setting"} className="w-1/4">
          <div
            className={`flex flex-col items-center justify-center ${
              menuSelected === "Setting" ? "text-[#ffcc01]" : ""
            } `}
            onClick={() => handleMenu("Setting")}
          >
            <img src={setting_icon} alt="setting" />
            <h2 className="px-4 py-2 rounded-md text-center cursor-pointer ">
              Setting
            </h2>
          </div>
        </Link>

        {/* {isAuthenticated && user && <LogoutButton user={user} />} */}
      </div>
      {/* <div>
        {isAuthenticated && user && (
          <h1 className="text-2xl text-center px-4 cursor-pointer">
            Welcome {user.name}!
          </h1>
        )}
      </div> */}
    </div>
  );
};

export default Header;
