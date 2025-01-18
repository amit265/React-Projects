import { useDispatch } from "react-redux";
import { signInWithGoogle } from "../../services/firebase";
import { handleUserLoginCheck } from "../../store/authSlice";
import "../../index.css"
import img from "../../assets/images/img.png"


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

      dispatch(handleUserLoginCheck(serializableUser));
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen text-white ">
      <h1 className="homemade-apple-regular text-5xl font-semibold">TriviaQuest</h1>
      <div>
        <img src={img} alt="trivia box" />
      </div>
      <h1 className="text-4xl text-center font-bold">Discover Facts, Conquer Challenges!</h1>
      <p className="w-2/3 text-center">Join the ultimate trivia adventure with TriviaQuest! Dive into engaging quizzes, challenge your brain, and win amazing rewards</p>
      <button
        onClick={handleLogin}
        className=" bg-[#ffcc01] px-6 py-3 text-black font-semibold rounded-md hover:bg-blue-600 transition duration-300"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
