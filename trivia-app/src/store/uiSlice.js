import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        loading: true,
        modalOpen: false,
        feedback: "",
        timer: 18,
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
        },
        setTimer : (state, action) => { 
            state.timer = action.payload;
        },
       
    },
})

export const { setLoading, setModalOpen, setFeedBack, setTimer} = uiSlice.actions;

export default uiSlice.reducer;