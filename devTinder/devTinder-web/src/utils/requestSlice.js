import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: null,
    reducers: {
        addRequests: (state, action) => {
            return action.payload;
        },
        removeRequest: () => {
            return null;
        }
    }
})

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
