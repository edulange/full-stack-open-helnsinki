/* eslint-disable */
import { Link } from 'react-router-dom';

const Blog = ({ blog, user }) => {
  if (user !== null) {
    return (
      <>
        <div className="mx-auto max-w-md shadow-left">
        <div className="bg-white p-4 mb-4 border rounded-md shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold">{blog.title}</h3>
              <span className="text-gray-600">{blog.author}</span>
            </div>
            <div className="flex justify-end">
              <Link to={`/blogs/${blog.id}`}>
                <button className="bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                  View
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default Blog;

