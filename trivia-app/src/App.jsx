import { useEffect, useState } from "react";
import { auth } from "./services/firebase";
import ReactLoading from "react-loading";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/auth/Login";
import Header from "./components/layout/Header";
import { login } from "./store/authSlice";
import useFetchQuestions from "./services/useFetchQuestions";
import Footer from "./components/layout/Footer";

const App = () => {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  // console.log("user from app.jsx", user);
  useFetchQuestions();

  useEffect(() => {
    // Function to handle authentication state change
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        // Create a serializable user object
        const serializableUser = {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        };

        // Dispatch the serializable user object
        dispatch(login(serializableUser));
      }
      setLoading(false); // Set loading state to false after authentication check
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]); // Dependency array includes `dispatch`

  // const handleLoginSuccess = (user) => {
  //   dispatch(login(user));
  //   setLoading(false);
  // };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ReactLoading
          type={"spin"}
          color={"blue"}
          height={"100px"}
          width={"100px"}
        />
      </div>
    );
  }

  return (
    <div>
      {!isAuthenticated ? (
        <Login />
      ) : (
        <>
        <Header />
        <Outlet />
        {/* <Footer /> */}
        </>
      )}
    </div>
  );
};

export default App;
