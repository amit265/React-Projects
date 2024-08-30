import {createSlice} from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "category",
    initialState: {
        allQuestions: [],

        categories: [],
        selectedCategory: null,
        categoryError: null
    },
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        setCategoryError: (state, action) => {
            state.categoryError = action.payload;
        },
        setAllQuestions: (state, action) => {
            state.allQuestions = action.payload;
        }

    
       
    },
})

export const { setCategories, setSelectedCategory, setCategoryError, setAllQuestions } = categorySlice.actions;

export default categorySlice.reducer;
