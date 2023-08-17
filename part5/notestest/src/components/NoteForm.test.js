import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NoteForm from './NoteForm'
import userEvent from '@testing-library/user-event'


test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const createNote = jest.fn()
  const user = userEvent.setup()

  render(<NoteForm createNote={createNote} />)

  // const input = screen.getByRole('textbox') //com um único input
  const inputs = screen.getAllByRole('textbox') //com mais de 1 input

  const input = screen.getByPlaceholderText('write note content here') //pega pelo placeholder
  const sendButton = screen.getByText('save')

  // await user.type(input, 'testing a form...') //com um único input
  await user.type(inputs[0], 'testing a form...') //com mais de 1 input 
  await user.click(sendButton)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].content).toBe('testing a form...')
})

