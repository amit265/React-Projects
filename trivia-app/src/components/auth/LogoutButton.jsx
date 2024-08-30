// components/LogoutButton.jsx

import React from 'react';
import { auth } from '../../services/firebase';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';

const LogoutButton = ({user}) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        dispatch(logout());
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Sign out error:', error);
      });
  };

  return (
    <>
    {user && <button
      onClick={handleLogout}
      className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-300"
    >
      Logout
    </button>}
    </>
  );
};

export default LogoutButton;
