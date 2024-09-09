import { useEffect, useState } from "react";
import { auth } from "./services/firebase";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/auth/Login";
import Header from "./components/layout/Header";
import { handleUserLoginCheck } from "./store/authSlice";
import useFetchQuestions from "./services/useFetchQuestions";
import { setLoading } from "./store/uiSlice";
import useFetchLeaderboard from "./services/useFetchLeaderboard";
import SplashScreen from "./pages/SplashScreen";

const App = () => {
  const { isAuthenticated } = useSelector((store) => store.auth);
  const [showSplash, setShowSplash] = useState(true);
  const [splashTimeoutDone, setSplashTimeoutDone] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.ui.loading);
  // console.log("user from app.jsx", user);
  useFetchQuestions();
  useFetchLeaderboard();

  useEffect(() => {
    // Function to handle authentication state change
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // Create a serializable user object
        const serializableUser = {
          uid: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email,
          image_url: currentUser.photoURL,
        };

        // Dispatch the serializable user object
        dispatch(handleUserLoginCheck(serializableUser));
      }
      dispatch(setLoading(false));
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]); // Dependency array includes `dispatch`

  // const handleLoginSuccess = (user) => {
  //   dispatch(login(user));
  //   setLoading(false);
  // };

  // Effect to handle the splash screen delay
  // Effect to handle the splash screen delay
  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setSplashTimeoutDone(true); // Mark splash screen timeout as done after 2 seconds
    }, 2000);

    return () => clearTimeout(splashTimeout); // Cleanup timeout on unmount
  }, []);

  // The splash screen should disappear only after both loading is false and the splashTimeout is done
  if (loading || !splashTimeoutDone) {
    return <SplashScreen />;
  }

  // if (loading) {
  //   setTimeout(() => {
  //     <SplashScreen />;
  //   }, 2000);
  //   // return (
  //   //   // <div className="flex items-center justify-center h-screen">
  //   //   //   <ReactLoading
  //   //   //     type={"spin"}
  //   //   //     color={"blue"}
  //   //   //     height={"100px"}
  //   //   //     width={"100px"}
  //   //   //   />
  //   //   // </div>
  //   // );
  // }

  return (
    <div className="max-w-screen-sm mx-auto shadow-2xl shadow-white p-4 bg-[#132f94] poppins-regular rounded-2xl min-h-screen m-4 transition-all duration-1000 ease-in">
      {!isAuthenticated ? (
        <Login />
      ) : (
        <div className="flex flex-col justify-between h-screen">
          <Outlet />
          <Header />
        </div>
      )}
    </div>
  );
};

export default App;
