import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog Component', () => {
  test('renders title and author but not URL or likes by default', () => {
    const blog = {
      title: 'Crimes and Punishment',
      author: 'Dudu',
      url: 'www.test.com.br',
      likes: 15
    }

    const { container } = render(<Blog blog={blog} />)

    const element = container.querySelector('.blog')
    console.log('element :>> ', element);
    expect(element).toHaveTextContent('Crimes and Punishment')
    expect(element).toHaveTextContent('Dudu')
    expect(element).not.toHaveValue(15)

    
  })
})
