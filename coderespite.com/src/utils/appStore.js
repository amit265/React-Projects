import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./projectsSlice";
import errorReducer from "./errorSlice"

const appStore = configureStore(
    {
        reducer: {
            projects: projectsReducer,
            error: errorReducer,
        }
    }
)

export default appStore;