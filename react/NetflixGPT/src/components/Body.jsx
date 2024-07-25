import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';


const Body = () => {

    const dispatch = useDispatch();
    // const navigate = useNavigate();


    const appRouter = createBrowserRouter([
        {
            path : "/",
            element: <Login />
        },
        {
            path : "/browse",
            element: <Browse />
        }
    ]);




  return (
    <div>
        <RouterProvider router = {appRouter} />
    </div>
  )
}

export default Body
