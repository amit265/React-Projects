import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import menu from "../../public/menu.png";
import {
  BASE_URL,
  LOGO,
  SUPPORTED_LANGUAGES,
  USER_AVATAR,
} from "../utils/constants";
import { toggleGPTSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const [hamMenu, setHamMenu] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate(BASE_URL + "/browse");
      } else {
        dispatch(removeUser());
        navigate(BASE_URL + "/");
      }
    });

    //unsubscribe when components unmounts
    return () => unsubscribe();
  }, []);

  const handleGPTSearch = () => {
    dispatch(toggleGPTSearchView());
    setHamMenu(false);

  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
    setHamMenu(false);

  };

  const handleHamMenu = () => {
    setHamMenu(!hamMenu);
  }

  return (
    <div className="fixed z-50 w-full bg-gradient-to-b from-black  px-0 sm:px-8 py-2 flex flex-col  sm:flex-row sm:justify-between sm:items-center">
      <div className="flex w-screen justify-between">
      <img className="w-44" src={LOGO} alt="logo" />
     {user &&  <img
          onClick={handleHamMenu}
            className="cursor-pointer sm:hidden right-0 bg-white w-10 h-10 p-2 rounded-lg m-4"
            src={menu}
            alt=""
          />
        }
      </div>
      {user && (
         
          <div className={`sm:flex sm:flex-row sm:gap-4 sm:justify-stretch items-center sm:bg-transparent sm:opacity-100 text-white ${hamMenu ? "flex flex-col bg-black opacity-75" : "hidden"}`}>
            {showGPTSearch && (
              <select
                onChange={handleLanguageChange}
                className="p-2 bg-gray-900 m-2"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}
            <button
              onClick={handleGPTSearch}
              className="p-2 mx-4 my-2 w-28  bg-purple-800 rounded"
            >
              {showGPTSearch ? "Home" : "GPT Search"}
            </button>
            <figure className="w-12 h-12">
              <img
                className="hidden sm:inline-block w-12 h-12"
                src={USER_AVATAR}
                alt="user Avatar"
              />
              <figcaption className="text-center py-2 my-1 rounded md:p-0 md:my-0 md:rounded-none md:bg-transparent">
                {user?.displayName
                  ? user?.displayName.split(" ")[0].slice(0, 6) + "..."
                  : "User"}
              </figcaption>
            </figure>
            <button
              onClick={handleSignOut}
              className="bg-red-600 p-2 mx-4 my-2 w-20 rounded"
            >
              Sign out
            </button>
          </div>
      )}
    </div>
  );
};

export default Header;
