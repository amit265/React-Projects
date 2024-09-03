import { useDispatch } from "react-redux";
import { signInWithGoogle } from "../../services/firebase";
import { handleUserLoginCheck } from "../../store/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  // Sign in with Google authentication using Firebase SDK
  const handleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      const serializableUser = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        image_url: user.photoURL,
      };
      // onLoginSuccess(result.user);
      console.log("serializableUser", serializableUser);

      dispatch(handleUserLoginCheck(serializableUser));
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button
        onClick={handleLogin}
        className="px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
