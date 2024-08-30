import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Home = () => {

  return (
    <div className="max-w-md container mx-auto p-4 rounded-lg shadow-md flex flex-col bg-gray-100">

      <main className="flex-grow p-6 md:p-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {/* Welcome{user ? `, ${user.displayName.split(' ')[0]}` : ''}! */}
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Discover a variety of quizzes and challenge yourself!
          </p>
        </div>

        <div className="mb-8">
          {/* <h2 className="text-2xl font-semibold text-gray-800 mb-4">Featured Quizzes</h2> */}
          {/* Optionally, display featured quizzes here */}
        </div>

        <div className="flex flex-col items-center space-y-4">
          {/* <Link to= {BASE_URL + "/quiz"} className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300">
            Start Quiz
          </Link> */}
          <Link to={BASE_URL + "/category"} className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300">
            Explore Categories
          </Link>
          <Link to={BASE_URL + "/leaderboard"} className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300">
            View Leaderboard
          </Link>
        </div>
      </main>

    </div>
  );
};

export default Home;
