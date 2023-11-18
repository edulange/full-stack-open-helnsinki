/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blogs: [],
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
    addBlog: (state, action) => {
      state.blogs.push(action.payload);
    },
    updateBlog: (state, action) => {
      const { id, updatedBlog } = action.payload;
      const index = state.blogs.findIndex(blog => blog.id === id);
      if (index !== -1) {
        state.blogs[index] = { ...state.blogs[index], ...updatedBlog };
      }
    },
    removeBlog: (state, action) => {
      const idToRemove = action.payload;
      state.blogs = state.blogs.filter((blog) => blog.id !== idToRemove);
    },
  },
});

export const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions;
export default blogSlice.reducer;
