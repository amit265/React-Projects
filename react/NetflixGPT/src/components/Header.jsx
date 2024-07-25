import { signOut } from "firebase/auth";
import {useEffect} from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, USER_AVATAR } from "../utils/constants";


const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const dispatch  = useDispatch();

  const handleSignOut =() => {
    signOut(auth).then(() => {
    }).catch((error) => {
        navigate("/error")
    });
  }

  useEffect(() => {


    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
             const {uid, displayName, email, photoURL} = user;
            dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}))
            navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/")
      }
    });


    //unsubscribe when components unmounts
    return () => unsubscribe();



}, [])




  return (
    <div className="absolute z-10 w-full bg-gradient-to-b from-black px-8 py-2 flex justify-between items-center">
      <img
        className="w-44"
        src={LOGO}
        alt="logo"
      />
      { user &&
      <div className="flex items-center space-x-4 text-white">
        <img className="w-12 h-12" src={USER_AVATAR} alt="" />
        <button onClick={handleSignOut} className="bg-red-600 px-4 py-2 rounded">Sign out</button>
      </div>
}
    </div>
  );
};

export default Header;
