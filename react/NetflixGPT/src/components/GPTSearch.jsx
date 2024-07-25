import React from 'react'
import GPTSearchBar from './GPTSearchBar'
import GPTMovieSuggestions from './GPTMovieSuggestions'
import { BACKGROUND_IMAGE } from '../utils/constants'

const GPTSearch = () => {
  

  return (
    <div>
      <div className='absolute -z-10'>
        <img src={BACKGROUND_IMAGE} alt="backgroundImage" />
        </div>
        <GPTSearchBar />
        <GPTMovieSuggestions />
      
    </div>
  )
}

export default GPTSearch
