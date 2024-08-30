import React from 'react'
import { useSelector } from 'react-redux';

const Feedback = () => {
    const feedback = useSelector((store) => store.ui.feedback);
    console.log("feedback", feedback);
    if(!feedback) return;
  return (
    <div className='p-4 '>
      <h2 className='text-base text-green-600 font-semibold'>{feedback}</h2>
    </div>
  )
}

export default Feedback
