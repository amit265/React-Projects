import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGPTMovieResult, clearGPTMovieResults } from "../utils/gptSlice";
import { clearMovieGenre } from "../utils/moviesSlice";
import { clearError, setError } from "../utils/errorSlice";
import openai from "../utils/openai";
import { setLoading } from "../utils/loadingSlice";
const GPTSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      );
      dispatch(clearError());
      const json = await data.json();
      return json.results;
    } catch (error) {
      dispatch(setError("Failed to fetch searched movie: " + error))
      return [];
    }
  };

  const handleGPTSearch = async () => {
    const searchTextValue = searchText.current.value;
    dispatch(clearMovieGenre());
    dispatch(clearGPTMovieResults());
    dispatch(setLoading());
    const gptQuery =
      "Act as a movie recommendation system and suggest some for the query" +
      searchText.current.value +
      ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmall, Koi Mil Gaya";

    // make an api call to openai and get movie results
    const gptResult = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResult.choices) {
      // TODO: Write Error Handling
      console.log("Error creating movie recommendations for " + gptQuery);
      
    }

    // console.log(gptResult?.choices?.[0]?.message?.content);


    // const gptResults = {
    //   choices: [
    //     "The Godfather",
    //     "The Shawshank Redemption",
    //     "Schindler's List",
    //     "Raging Bull",
    //     "Casablanca",
    //     "Citizen Kane",
    //     "Gone with the Wind",
    //     "The Wizard of Oz",
    //     "One Flew Over the Cuckoo's Nest",
    //     "Lawrence of Arabia",
    //   ],
    // };

    const gptMovies = gptResult?.choices?.[0]?.message?.content.split(",");
    

    try {
      let tmdbResults;
      if (searchTextValue) {
        // const result = await searchMovieTMDB(searchTextValue);
        // tmdbResults = [result];
        // dispatch(
        //   addGPTMovieResult({
        //     movieNames: [searchTextValue],
        //     movieResults: tmdbResults,
        //   })
        // );

        const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
        tmdbResults = await Promise.all(promiseArray);
        dispatch(
          addGPTMovieResult({
            movieNames: gptMovies,
            movieResults: tmdbResults,
          })
        );
      } else {
       
        // alert("Enter name of anymovie")
      }
    } catch (error) {
      console.error("Error during GPT search:", error);
    }

    searchText.current.value = "";

  };

  return (
    <>
      <div className="px-1 sm:px-4 pt-[40%] sm:pt-[15%] md:pt-[10%] lg:pt-[7%] flex justify-center">
        <form
          className="bg-black md:w-3/4 lg:w-1/2 grid grid-cols-12 w-full "
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="p-4 sm:m-4 my-4 mx-2 col-span-9"
            type="text"
            required
            ref={searchText}
            placeholder={lang[langKey].gptSearchPlaceholder}
          />

          <button
            onClick={handleGPTSearch}
            type="submit"
            disabled={!searchText}
            className="bg-red-700 hover:bg-red-900 my-4 mx-2 sm:m-4 sm:px-4 py-2 text-white rounded-lg col-span-3"
          >
            {lang[langKey].search}
          </button>
        </form>
      </div>
    </>
  );
};

export default GPTSearchBar;
