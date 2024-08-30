import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        loading: false,
        modalOpen: false,
        feedback: "",
    },
    reducers: {

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setModalOpen: (state, action) => {
            state.modalOpen = action.payload;
        },

        setFeedBack: (state, action) => {
            state.feedback = action.payload;
        }
       
    },
})

export const { setLoading, setModalOpen, setFeedBack} = uiSlice.actions;

export default uiSlice.reducer;