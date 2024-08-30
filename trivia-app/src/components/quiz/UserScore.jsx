import React from 'react'
import { useSelector } from 'react-redux';

const UserScore = () => {
    const userScore = useSelector((store) => store.quiz.userScore);

  return (
    <div>
      <h2 className='text-xl text-center p-4'>Your score: {userScore}</h2>
    </div>
  )
}

export default UserScore
