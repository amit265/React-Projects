import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
    name: "error",
    initialState: {
        errorMessage: null,
    },
    reducers: {
        setError: (state, action) => {
            state.errorMessage = action.payload;
        },
        clearError: (state) => {
            state.errorMessage = null;
        }
    }
})
export const {setError, clearError} = errorSlice.actions;
export default errorSlice.reducer; 