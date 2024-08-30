import React, { useMemo } from "react";
import LogoutButton from "../auth/LogoutButton";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";

const Header = () => {
  const { isAuthenticated, user } = useSelector((store) => store.auth);
  return (
    <div className="flex justify-between p-4">
      <div className="flex justify-center gap-24 w-full p-1 m-1">
        <Link to={BASE_URL + "/"}>
          <h2 className="p-1 m-1 bg-slate-400 rounded-md hover:bg-gray-900 hover:text-gray-100 text-center cursor-pointer ">
            Home
          </h2>
        </Link>
{/* 
        <Link to={BASE_URL + "/quiz"}>
          <h2 className="p-1 m-1 bg-slate-400 rounded-md hover:bg-gray-900 hover:text-gray-100 text-center cursor-pointer ">
            Quiz
          </h2>
        </Link> */}

        <Link to={BASE_URL + "/profile"}>
          <h2 className="p-1 m-1 bg-slate-400 rounded-md hover:bg-gray-900 hover:text-gray-100 text-center cursor-pointer">
            Profile
          </h2>
        </Link>
        <Link to={BASE_URL + "/leaderboard"}>
          <h2 className="p-1 m-1 bg-slate-400 rounded-md hover:bg-gray-900 hover:text-gray-100 text-center cursor-pointer">
            Leader Board
          </h2>
        </Link>
      </div>
      {isAuthenticated && user && (
        <div className="flex flex-col  p-1 m-1 pr-4">
          <LogoutButton user={user} />
          <h1 className="text-2xl text-center px-4 cursor-pointer">
            {user.displayName.split(" ")[0]}!
          </h1>
        </div>
      )}
    </div>
  );
};

export default Header;
