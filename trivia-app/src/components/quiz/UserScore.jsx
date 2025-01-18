import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";

const UserScore = () => {
  const userScore = useSelector((store) => store.quiz.userScore);
  const questions = useSelector((store) => store.quiz.questions);
  const timer = useSelector((store) => store.ui.timer);
  console.log("timer", timer);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     dispatch((dispatch, getState) => {
  //       const currentTimer = getState().ui.timer;
  //       const newTimer = currentTimer > 0 ? currentTimer - 1 : 0;
  //       dispatch(setTimer(newTimer));
  //     });
  //   }, 1000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [dispatch]);

  

  return (
    <div className="flex justify-between items-center text-white p-4 text-xl">
      <Link to={BASE_URL + "/"}>
        <div>
          <h1 className="text-white text-3xl">←</h1>
        </div>
      </Link>
      {/* <div className="text-center flex gap-4">
        <h1>⏰</h1>
        <span>{timer}</span>
      </div> */}
      <h2 className="text-center text-base p-4">Your score: {userScore}/ {questions.length * 10}</h2>
    </div>
  );
};

export default UserScore;
