import React, { useMemo } from "react";
import LogoutButton from "../auth/LogoutButton";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";

const Header = () => {
  const { isAuthenticated, user } = useSelector((store) => store.auth);
  return (
    <div className="flex p-4 flex-col justify-center items-center">
      <div className="flex justify-center gap-12 p-1 m-1">
        <Link to={BASE_URL + "/"}>
          <h2 className="px-4 py-2 bg-slate-400 rounded-md hover:bg-gray-900 hover:text-gray-100 text-center cursor-pointer ">
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
          <h2 className="px-4 py-2 bg-slate-400 rounded-md hover:bg-gray-900 hover:text-gray-100 text-center cursor-pointer">
            Profile
          </h2>
        </Link>
        {/* <Link to={BASE_URL + "/leaderboard"}>
          <h2 className="p-1 m-1 bg-slate-400 rounded-md hover:bg-gray-900 hover:text-gray-100 text-center cursor-pointer">
            Leader Board
          </h2>
        </Link> */}

        {isAuthenticated && user && (
            <LogoutButton user={user} />
           
        )}
      </div>
      <div>
      {isAuthenticated && user && (
            <h1 className="text-2xl text-center px-4 cursor-pointer">Welcome {" "} 
            {user.displayName.split(" ")[0]}!
          </h1>
           
        )}
      </div>
    </div>
  );
};

export default Header;
