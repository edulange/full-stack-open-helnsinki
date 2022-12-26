import { useState } from 'react'
import Note from './components/Notes'


const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
    setNotes(notes.concat(noteObject)) //ele cria uam copia do array, nunca deve mudar o estado diretamente
    setNewNote('')
  }
  const handleNoteChange = (event) => {
    console.log(event.target.value)  
    setNewNote(event.target.value)  //aqui coloca no input, aqui nao precisa prevent default!
    //n precisa p qele é usado no input e não no form, no form precisa prevent default
  }

//vamos mudar o componente para ele armazenar a lista com todos notes para ser displayado no "notesToShow"
//os items da lista dependem do state component
const notesToShow = showAll ? notes : notes.filter(note => note.important === true) // n precisa desse true, é redundância


  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important': 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
          )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>   
    </div>
  )
}
export default App 