import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./projectsSlice";
import errorReducer from "./errorSlice";
import blogReducer from "./blogSlice";

const appStore = configureStore(
    {
        reducer: {
            projects: projectsReducer,
            blogs: blogReducer,
            error: errorReducer,
        }
    }
)

export default appStore;