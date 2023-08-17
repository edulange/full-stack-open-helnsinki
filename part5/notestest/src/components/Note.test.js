import React from 'react'
import '@testing-library/jest-dom'
// import '@testing-library/jest-dom/extend-expect'
// deveria ser o de cima, mas simplesmente não funcionou.
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }

  render(<Note note={note} />)

  screen.debug()

  const element = screen.getByText(
    'Component testing is done with react-testing-library'
  )
  expect(element).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }

  const mockHandler = jest.fn()

  render(<Note note={note} toggleImportance={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('make not important')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})

test('renders content', () => {
  const note = {
    content: 'Does not work anymore :(',
    important: true,
  }

  render(<Note note={note} />)

  // const element = screen.getByText('Does not work anymore :(') // não vai funcionar pq ele procura o texto exato e nada mais
  // const element = screen.getByText('Does not work anymore :(', { exact: false })  // funciona
  const element = screen.findByText('Does not work anymore :(') //procura o texto exato

  expect(element).toBeDefined()
})

