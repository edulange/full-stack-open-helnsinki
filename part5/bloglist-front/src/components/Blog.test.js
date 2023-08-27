import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog Component', () => {
  test('renders title and author but not URL or likes by default', () => {
    const blog = {
      title: 'Sample Blog Title',
      author: 'John Doe',
      url: 'www.test.com.br',
      likes: 15
    }

    const { container } = render(<Blog blog={blog} />)


    const titleElement = container.querySelector('.blog-title')
    const authorElement = container.querySelector('.blog-author')
    const urlElement = container.querySelector('.blog-url')
    const likesElement = container.querySelector('.blog-likes')

    // Assert that title and author are rendered
    expect(titleElement).toHaveTextContent('Sample Blog Title')
    expect(authorElement).toHaveTextContent('John Doe')

    // Assert that URL and likes are not rendered
    expect(urlElement).toBeNull()
    expect(likesElement).toBeNull()
  })
})
