import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
  },
  reducers: {
    addBlog: (state, action) => {
      state.blogs = action.payload;
    },
  },
});

export const { addBlog } = blogSlice.actions;
export default blogSlice.reducer;
