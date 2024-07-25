export const OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY;
const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;

export const USER_AVATAR =
  "https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e";
export const BACKGROUND_IMAGE =
  "https://assets.nflxext.com/ffe/siteui/vlv3/655a9668-b002-4262-8afb-cf71e45d1956/5ff265b6-3037-44b2-b071-e81750b21783/IN-en-20240715-POP_SIGNUP_TWO_WEEKS-perspective_WEB_c6d6616f-4478-4ac2-bdac-f54b444771dd_large.jpg";

export const LOGO =
  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + TMDB_KEY,
  },
};

export const BASE_URL = "/projects/react/netflixgpt";

export const NOW_PLAYING ="https://api.themoviedb.org/3/movie/now_playing?&page=1";
export const POPULAR = "https://api.themoviedb.org/3/movie/popular?page=1";
export const UPCOMING = "https://api.themoviedb.org/3/movie/upcoming?&page=1";
export const TOP_RATED = "https://api.themoviedb.org/3/movie/top_rated?&page=1";





export const IMG_CDN_URL = "https://image.tmdb.org/t/p/original";

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "Hindi" },
  { identifier: "bahasa", name: "Bahasa" },
];
