import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import {
  BASE_URL,
  LOGO,
  SUPPORTED_LANGUAGES,
  USER_AVATAR,
} from "../utils/constants";
import { toggleGPTSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const showGPTSearch = useSelector(store => store.gpt.showGPTSearch);

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
  };


  const handleLanguageChange = (e) => {

    dispatch(changeLanguage(e.target.value));

  }




  return (
    <div className="fixed z-50 w-full bg-gradient-to-b from-black px-8 py-2 flex justify-between items-center">
    <img className="w-44" src={LOGO} alt="logo" />
    {user && (
      <div className="flex items-center space-x-4 text-white">
        {showGPTSearch && (
          <select
            onChange={handleLanguageChange}
            className="p-2 bg-gray-900 text-white m-2"
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
          className="p-2 mx-4 my-2 bg-purple-800 text-white rounded-lg"
        >
          {showGPTSearch ? "Home" : "GPT Search"}
        </button>
        <img className="w-12 h-12" src={USER_AVATAR} alt="" />
        <button
          onClick={handleSignOut}
          className="bg-red-600 px-4 py-2 rounded"
        >
          Sign out
        </button>
      </div>
    )}
  </div>
  );
};

export default Header;
