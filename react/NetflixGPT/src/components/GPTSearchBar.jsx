import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGPTMovieResult, clearGPTMovieResults } from "../utils/gptSlice";
import { clearMovieGenre } from "../utils/moviesSlice";

const GPTSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  console.log("searchText", searchText);

  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          movie +
          "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
      );
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      const json = await data.json();
      return json.results;
    } catch (error) {
      console.log("There is some error while fetching movies" + error);
      return [];
    }
  };

  const handleGPTSearch = async () => {
    const searchTextValue = searchText.current.value;
    dispatch(clearMovieGenre());
    dispatch(clearGPTMovieResults());

    // const gptQuery =
    //   "Act as a movie recommendation system and suggest some for the query" +
    //   searchText.current.value +
    //   ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmall, Koi Mil Gaya";

    //make an api call to openai and get movie results
    // const gptResults = await openai.chat.completions.create({
    //   messages: [{ role: "user", content: gptQuery }],
    //   model: "gpt-3.5-turbo",
    // });

    const gptResults = {
      choices: [
        "The Godfather",
        "The Shawshank Redemption",
        "Schindler's List",
        "Raging Bull",
        "Casablanca",
        "Citizen Kane",
        "Gone with the Wind",
        "The Wizard of Oz",
        "One Flew Over the Cuckoo's Nest",
        "Lawrence of Arabia",
      ],
    };

    const gptMovies = gptResults.choices;

    try {
      let tmdbResults;
      if (searchTextValue) {
        const result = await searchMovieTMDB(searchTextValue);
        tmdbResults = [result];
        console.log("searchTextValue, tmdbResults", tmdbResults);
        dispatch(
          addGPTMovieResult({
            movieNames: [searchTextValue],
            movieResults: tmdbResults,
          })
        );
      } else {
        const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
        tmdbResults = await Promise.all(promiseArray);
        console.log("promiseArray, tmdbResults", tmdbResults);
        dispatch(
          addGPTMovieResult({
            movieNames: gptMovies,
            movieResults: tmdbResults,
          })
        );
      }
    } catch (error) {
      console.error("Error during GPT search:", error);
    }
  };

  return (
    <>
      <div className="sm:pt-[7%] pt-[15%] flex justify-center">
        <form
          className="bg-black sm:w-1/2 grid grid-cols-12 w-full"
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
      
    </>
  );
};

export default GPTSearchBar;
