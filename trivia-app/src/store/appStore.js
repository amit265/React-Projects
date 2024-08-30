import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import quizReducer from "./quizSlice";
import lifeLineReducer from "./lifeLine";
import leaderBoardReducer from "./leaderboardSlice"; 
import categoryReducer from "./categorySlice";
import uiReducer from "./uiSlice";


const appStore = configureStore({
    reducer: {
        // Define your reducers here
        auth : authReducer,
        quiz: quizReducer,
        lifeLine: lifeLineReducer,
        leaderboard: leaderBoardReducer,
        category: categoryReducer,
        ui: uiReducer,

    }
})

export default appStore;