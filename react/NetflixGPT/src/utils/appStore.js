import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./moviesSlice";
import gptReducer from "./gptSlice";
import errorReducer from "./errorSlice"
import configReducer from "./configSlice"
const appStore = configureStore(
    {
        reducer : {
            user: userReducer,
            movies: moviesReducer,
            gpt: gptReducer,
            config: configReducer,
            error: errorReducer,
        }
    }
)

export default appStore;