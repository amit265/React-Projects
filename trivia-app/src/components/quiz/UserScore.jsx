import { useSelector } from 'react-redux';

const UserScore = () => {
    const userScore = useSelector((store) => store.quiz.userScore);
    const questions = useSelector((store) => store.quiz.questions);

  return (
    <div>
      <h2 className='text-xl text-center p-4'>Your score: {userScore}/{questions.length * 10}</h2>
    </div>
  )
}

export default UserScore
