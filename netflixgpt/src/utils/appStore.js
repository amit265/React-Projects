import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import gptReducer from "./gptSlice";
import errorReducer from "./errorSlice"
import loadingReducer from "./loadingSlice"
import configReducer from "./configSlice"
const appStore = configureStore(
    {
        reducer : {
            user: userReducer,
            movies: moviesReducer,
            gpt: gptReducer,
            config: configReducer,
            error: errorReducer,
            loading: loadingReducer,
        }
    }
)

export default appStore;