import { useState } from 'react'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

// modules can have several named exports

export const useAnotherHook = () => {
  // ...
}

export const getFieldProps = (field) => {
    // Create a new object with only the properties you want to spread
    const { type, value, onChange } = field;
    return { type, value, onChange };
  }
// estou utilizando isso aqui pq? para conseguir utilizar o useField
// e assim eu posso utilizar o useField só as propriedades que eu quero