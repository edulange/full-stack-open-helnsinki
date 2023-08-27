import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen  } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Crimes and Punishment',
  author: 'Dudu',
  url: 'www.test.com.br',
  likes: 15
}

const blogUser = {
  id: '69'
}

  test('renders title and author but not URL or likes by default', () => {
  
    const { container } = render(<Blog blog={blog} />)
    const element = container.querySelector('.blog')
    expect(element).toHaveTextContent('Crimes and Punishment')
    expect(element).toHaveTextContent('Dudu')
    expect(element).not.toHaveValue(15)
  })

  test('renders likes and url after button click', async () => {
    const mockHandler = jest.fn()
    const { container } = render(<Blog blog={blog} toggleDetail={mockHandler} user={blogUser}/>)
  
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const element = container.querySelector('.blogDetail')
    const like = screen.getByText('Likes 15', { exact: false })
  
    expect(element).toHaveTextContent('www.test.com.br')
    expect(like).toBeDefined()
  })

  test('calls twice', async () => {
    const mockHandler = jest.fn()
    const { container } = render(<Blog blog={blog} user={blogUser}>
      <button onClick={() => mockHandler(blog.id)} className='like'>
        like
      </button>
    </Blog>)
  
    const user = userEvent.setup()
    const button = container.querySelector('.like')
    await user.dblClick(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })