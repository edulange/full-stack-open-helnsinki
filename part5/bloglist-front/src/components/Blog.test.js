import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Blog from './Blog';

describe('Blog Component', () => {
  test('renders title and author but not URL or likes by default', () => {
    const blog = {
      title: 'Sample Blog Title',
      author: 'John Doe',
      url: 'https://sample-blog.com',
      likes: 42,
    };

    const component = render(<Blog blog={blog} />);

    // Assertions
    expect(component.container).toHaveTextContent('Sample Blog Title');
    expect(component.container).toHaveTextContent('John Doe');
    expect(component.container).not.toHaveTextContent('https://sample-blog.com');
    expect(component.container).not.toHaveTextContent('Likes 42');
  });
});