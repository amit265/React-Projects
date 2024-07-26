import React from 'react';
import GPTSearchBar from './GPTSearchBar';
import GPTMovieSuggestions from './GPTMovieSuggestions';
import { BACKGROUND_IMAGE } from '../utils/constants';
import MovieGenre from './MovieGenre';

const GPTSearch = () => {
  return (
    <div className="relative">
      <div className="fixed -z-10 w-full h-full">
        <img
          className="top-0 left-0 w-full h-full object-cover"
          src={BACKGROUND_IMAGE}
          alt="backgroundImage"
        />
      </div>
      <div className="relative z-5">
        <GPTSearchBar />
        <MovieGenre />
        <GPTMovieSuggestions />
      </div>
    </div>
  );
};

export default GPTSearch;
