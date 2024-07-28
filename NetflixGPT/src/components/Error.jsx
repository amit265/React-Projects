import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const ErrorPage = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate(BASE_URL + "/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-10 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          You seem lost...
        </h1>
        <p className="text-gray-600 mb-8">
          Let's get you back to the homepage.
        </p>
        <button
          onClick={goToHome}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
