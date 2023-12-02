import { useState } from 'react'
/* eslint-disable */


const FormField = ({ label, type, value, onChange }) => (
  <div className="mb-2">
    <label htmlFor={label.toLowerCase()} className="block text-sm font-medium text-gray-600">
      {label}
    </label>
    <input
      id={label.toLowerCase()}
      type={type}
      name={label.toLowerCase()}
      value={value}
      onChange={({ target }) => onChange(target.value)}
      className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
    />
  </div>
);

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    });

    setNewBlogTitle('');
    setNewBlogAuthor('');
    setNewBlogUrl('');
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-2">Create a new blog</h2>
      <form onSubmit={addBlog}>
        <FormField label="Title" type="text" value={newBlogTitle} onChange={setNewBlogTitle} />
        <FormField label="Author" type="text" value={newBlogAuthor} onChange={setNewBlogAuthor} />
        <FormField label="URL" type="text" value={newBlogUrl} onChange={setNewBlogUrl} />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
