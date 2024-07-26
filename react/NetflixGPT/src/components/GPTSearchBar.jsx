import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
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

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    // [promise, promise, promise, promise, promise]

    const tmdbResults = await Promise.all(promiseArray);


    dispatch(
      addGPTMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
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
      <div className="text-center">
        <p className="px-2 py-1 w-6/12 bg-white text-blue-700 mx-auto">
          API token is exhausted. If you search anything, it will show results of default query which is <span className="text-red-700 italic bg-blue-200">Best 10 movies of
          all time.</span>
        </p>
      </div>
    </>
  );
};

export default GPTSearchBar;
