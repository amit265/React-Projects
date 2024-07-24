import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const handleSignOut =() => {
    signOut(auth).then(() => {
        navigate("/");
    }).catch((error) => {
        navigate("/error")
    });
  }
  return (
    <div className="absolute z-10 w-full bg-gradient-to-b from-black px-8 py-2 flex justify-between items-center">
      <img
        className="w-44"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
      { user &&
      <div className="flex items-center space-x-4 text-white">
        <img className="w-12 h-12" src={user.photoURL} alt="" />
        <button onClick={handleSignOut} className="bg-red-600 px-4 py-2 rounded">Sign out</button>
      </div>
}
    </div>
  );
};

export default Header;
