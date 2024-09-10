import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import Category from "../pages/Category";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((store) => store.auth);
  const totalScore = useSelector((store) => store.quiz.totalScore);
  const leaderboard = useSelector((store) => store.leaderboard.leaderboard);
  const currentUser = leaderboard.find(
    (leaderboard) => leaderboard.uid === user.uid
  );
  console.log("currentUser", currentUser);
  const userScore = totalScore.reduce((a, b) => a + b, 0);

  return (
    <div className="w-full mx-auto p-2 rounded-lg shadow-md flex flex-col overflow-y-auto">
      <main className="p-6 md:p-12 ">
        <div className="flex justify-between items-center">
          <div className="flex  items-center gap-2 ">
            <div className="w-12">
              <img
                src={user.image_url}
                alt={user.name}
                className="rounded-full"
              />
            </div>
            <h1 className="text-3xl font-bold text-white">
              Hi{user ? `, ${user.name.split(" ")[0]}` : ""}!
            </h1>
            {/* <p className="text-lg text-gray-600 mt-2">
            Discover a variety of quizzes and challenge yourself!
          </p> */}
          </div>
          <div>
            <h1 className="text-white text-lg">Total Score : {userScore}</h1>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <Category />
        </div>
      </main>
    </div>
  );
};

export default Home;
