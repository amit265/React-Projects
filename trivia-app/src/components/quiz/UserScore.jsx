import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";

const UserScore = () => {
  const userScore = useSelector((store) => store.quiz.userScore);
  // const questions = useSelector((store) => store.quiz.questions);

  return (
    <div className="flex justify-between items-center text-white p-4 text-xl">
      <Link to={BASE_URL + "/"}>
        <div>
          <h1 className="text-white text-3xl">←</h1>
        </div>
      </Link>
      <div className="text-center flex gap-4">
        <h1>⏰</h1>
        <span>20</span>
      </div>
      <h2 className="text-center p-4">{userScore}</h2>
    </div>
  );
};

export default UserScore;
