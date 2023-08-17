import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import Blog from './Blog'; // Import the actual path to your Blog component

describe('Blog component', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
  };

  test('renders title and author, but not URL or likes by default', () => {
    const component = render(<Blog blog={blog} />);

    // Check that title and author are rendered
    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);

    // Check that URL and likes are not rendered
    expect(component.container).not.toHaveTextContent(blog.url);
    expect(component.container).not.toHaveTextContent(`Likes: ${blog.likes}`);
  });
});
