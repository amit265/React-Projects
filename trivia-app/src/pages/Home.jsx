import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import Category from "../pages/Category";

const Home = () => {

  return (
    <div className="max-w-md container mx-auto p-4 rounded-lg shadow-md flex flex-col">

      <main className="flex-grow p-6 md:p-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {/* Welcome{user ? `, ${user.displayName.split(' ')[0]}` : ''}! */}
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Discover a variety of quizzes and challenge yourself!
          </p>
        </div>

          <div className="flex flex-col items-center space-y-4">
          {/* <Link to= {BASE_URL + "/quiz"} className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300">
            Start Quiz
          </Link> */}
        <Category />
        </div>
      </main>

    </div>
  );
};

export default Home;
