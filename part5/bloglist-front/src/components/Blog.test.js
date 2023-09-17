import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('Testando se renderiza o blog', () => {
  const blog = {
    title: 'Teste',
    author: 'Dudu',
    url: 'www.teste.com.br',
    likes: 5
  }

  const { container } = render(<Blog blog={blog} />)
  const element = container.querySelector('.blog')
  screen.debug()
  
  //const element = screen.getByText('Teste', { exact: false})
  expect(element).toHaveTextContent('Teste')
  expect(element).toHaveTextContent('Dudu')
  expect(element).not.toHaveTextContent('www.teste.com.br')
  expect(element).not.toHaveValue(5)
})

test('Testadno se o o URL e o número de likes é mostrado quando clicado em View', () => {
  const user = userEvent.setup()
})