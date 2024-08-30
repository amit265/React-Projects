import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import quizReducer from "./quizSlice";
import lifeLineReducer from "./lifeLine";
import leaderBoardReducer from "./leaderboardSlice"; 
import cateoryReducer from "./categorySlice";
import uiReducer from "./uiSlice";


const appStore = configureStore({
    reducer: {
        // Define your reducers here
        auth : authReducer,
        quiz: quizReducer,
        lifeLine: lifeLineReducer,
        leaderboard: leaderBoardReducer,
        category: cateoryReducer,
        ui: uiReducer,

    }
})

export default appStore;