import { createSlice } from "@reduxjs/toolkit";
import { FETCH_PROJECTS, ADD_PROJECT, UPDATE_PROJECT, DELETE_PROJECT } from './actions';

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    react: [],
    next: [],
    javascript: [],
    responsive: [],
  },
  reducers: {
    // Existing reducers (if needed)
    addReact: (state, action) => {
      state.react = action.payload;
    },
    addNext: (state, action) => {
      state.next = action.payload;
    },
    addJavascript: (state, action) => {
      state.javascript = action.payload;
    },
    addResponsive: (state, action) => {
      state.responsive = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(FETCH_PROJECTS, (state, action) => {
        state[action.payload.table] = action.payload.data;
      })
      .addCase(ADD_PROJECT, (state, action) => {
        state[action.payload.table].push(action.payload.project);
      })
      .addCase(UPDATE_PROJECT, (state, action) => {
        const index = state[action.payload.table].findIndex(
          (project) => project.id === action.payload.project.id
        );
        if (index !== -1) {
          state[action.payload.table][index] = action.payload.project;
        }
      })
      .addCase(DELETE_PROJECT, (state, action) => {
        state[action.payload.table] = state[action.payload.table].filter(
          (project) => project.id !== action.payload.id
        );
      });
  }
});

export const { addReact, addJavascript, addResponsive, addNext } = projectsSlice.actions;

export default projectsSlice.reducer;
