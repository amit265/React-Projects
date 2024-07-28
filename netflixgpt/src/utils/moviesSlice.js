import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    movieGenre: null,
    trailers: {}, // Use an object to store trailers by movie ID
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addTrailerVideo: (state, action) => {
      const { id, trailer } = action.payload;
      state.trailers[id] = trailer;
    },
    addMovieGenre: (state, action) => {
      state.movieGenre = action.payload;
    },
    clearMovieGenre: (state) => {
      state.movieGenre = null;
    }
  },
});

export const {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  addTrailerVideo,
  addMovieGenre,
  clearMovieGenre
} = moviesSlice.actions;

export default moviesSlice.reducer;
