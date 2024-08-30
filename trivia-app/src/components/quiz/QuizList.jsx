import QuizCard from "./QuizCard";
import ProgressBar from "./ProgressBar";
import Category from "../../pages/Category";

const QuizList = () => {
  return (
    <div className="flex flex-col justify-between items-center p-4">
      <h2>Quiz list</h2>
      <ProgressBar />
      <Category />

      <QuizCard />
      
    </div>
  )
}

export default QuizList
