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
      state.blogs = state.blogs.map((blog) => (blog.id === id ? updatedBlog : blog));
    },
    removeBlog: (state, action) => {
      const idToRemove = action.payload;
      state.blogs = state.blogs.filter((blog) => blog.id !== idToRemove);
    },
  },
});

export const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions;
export default blogSlice.reducer;
