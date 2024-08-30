import {createSlice} from "@reduxjs/toolkit";

const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState: {
        leaderboard: [],
        loadingLeaderboard: false,
        errorLeaderboard: null,
    },
    reducers: {
        setLeaderboard: (state, action) => {
            state.leaderboard = action.payload;
        },
        setLeaderboardLoading: (state, action) => {
            state.loadingLeaderboard = action.payload;
        },
        setLeaderboardError: (state, action) => {
            state.errorLeaderboard = action.payload;
        }
    }
});

export const {setLeaderboard, setLeaderboardLoading, setLeaderboardError} = leaderboardSlice.actions;

export default leaderboardSlice.reducer;