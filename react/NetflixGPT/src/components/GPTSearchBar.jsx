import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGPTMovieResult } from "../utils/gptSlice";

const GPTSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGPTSearch = async () => {
    const gptQuery =
      "Act as a movie recommendation system and suggest some for the query" +
      searchText.current.value +
      ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmall, Koi Mil Gaya";

    // console.log(searchText.current.value);
    //make an api call to openai and get movie results
    // const gptResults = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: gptQuery }],
    //   model: "gpt-3.5-turbo",
    // });

    console.log(gptQuery);

    const gptResults = {
      choices: [
        "Action",
        "Adventure",
        "Animation",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Family",
        "Fantasy",
        "History",
        "Horror",
        "Music",
        "Mystery",
        "Sensuous",
        "Romance",
        "Sex",
        "Adult",
        "Science Fiction",
        "TV Movie",
        "Thriller",
        "War",
        "Western",
        "historical",
        "Biographical",
      ],
    };
    console.log(gptResults.choices);

    const gptMovies = gptResults.choices;

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    // [promise, promise, promise, promise, promise]

    const tmdbResults = await Promise.all(promiseArray);

    console.log(tmdbResults);

    dispatch(
      addGPTMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <>
      <div className="pt-[5%] flex justify-center">
        <form
          className="bg-black w-1/2 grid grid-cols-12"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="p-4 m-4 col-span-9"
            type="text"
            ref={searchText}
            placeholder={lang[langKey].gptSearchPlaceholder}
          />
          <button
            onClick={handleGPTSearch}
            className="bg-red-700 hover:bg-red-900 m-4 px-4 py-2 text-white rounded-lg col-span-3"
          >
            {lang[langKey].search}
          </button>
        </form>
      </div>

      <div>
        <div className="text-center">
          <button
            onClick={handleGPTSearch}
            className="bg-blue-700 m-4 px-8 py-4 text-white rounded-lg col-span-3 hover:bg-blue-800"
          >
            {lang[langKey].allCategories}
          </button>

          <button
            onClick={handleGPTSearch}
            className="bg-blue-700 m-4 px-8 py-4 text-white rounded-lg col-span-3 hover:bg-blue-800"
          >
            {lang[langKey].top250}
          </button>

          <button
            onClick={handleGPTSearch}
            className="bg-blue-700 m-4 px-8 py-4 text-white rounded-lg col-span-3 hover:bg-blue-800"
          >
            {lang[langKey].action}
          </button>

          <button
            onClick={handleGPTSearch}
            className="bg-blue-700 m-4 px-8 py-4 text-white rounded-lg col-span-3 hover:bg-blue-800"
          >
            {lang[langKey].comedy}
          </button>

          <button
            onClick={handleGPTSearch}
            className="bg-blue-700 m-4 px-8 py-4 text-white rounded-lg col-span-3 hover:bg-blue-800"
          >
            {lang[langKey].documentary}
          </button>

          <button
            onClick={handleGPTSearch}
            className="bg-blue-700 m-4 px-8 py-4 text-white rounded-lg col-span-3 hover:bg-blue-800"
          >
            {lang[langKey].fantasy}
          </button>

          <button
            onClick={handleGPTSearch}
            className="bg-blue-700 m-4 px-8 py-4 text-white rounded-lg col-span-3 hover:bg-blue-800"
          >
            {lang[langKey].horror}
          </button>

          <button
            onClick={handleGPTSearch}
            className="bg-blue-700 m-4 px-8 py-4 text-white rounded-lg col-span-3 hover:bg-blue-800"
          >
            {lang[langKey].mystery}
          </button>

          <button
            onClick={handleGPTSearch}
            className="bg-blue-700 m-4 px-8 py-4 text-white rounded-lg col-span-3 hover:bg-blue-800"
          >
            {lang[langKey].romance}
          </button>

          <button
            onClick={handleGPTSearch}
            className="bg-blue-700 m-4 px-8 py-4 text-white rounded-lg col-span-3 hover:bg-blue-800"
          >
            {lang[langKey].thriller}
          </button>

          <button
            onClick={handleGPTSearch}
            className="bg-blue-700 m-4 px-8 py-4 text-white rounded-lg col-span-3 hover:bg-blue-800"
          >
            {lang[langKey].musical}
          </button>
        </div>
      </div>
    </>
  );
};

export default GPTSearchBar;
