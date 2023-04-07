import { Button } from './Form'

//renderiza o objeto pessoa na lista e o botão delete
export const Person = (person, props) => {
    return (
      <li key={person.id}>
        {person.name}
        {' '}
        {person.number}
        {' '}
        <Button onClick={() => props.buttonFunction(person.id)} text='Delete' />
      </li>
    )
  }
  