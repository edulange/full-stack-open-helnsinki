/* eslint-disable */
import React from 'react';
import Blog from './Blog';
import Togglable from './Togglable';
import BlogForm from './BlogForm';

const BlogSection = ({ blogs, user, addBlog, blogFormRef }) => (
  <>
    {user && (
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )}
    {[...blogs]
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
  </>
);

export default BlogSection;
