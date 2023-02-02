// https://martinfowler.com/articles/richardsonMaturityModel.html
// pra mim ler depois


const express = require('express')
const app = express()

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]


  app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    console.log('note.id :>> ', note.id, typeof note.id);
    
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })
  
  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
  })

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)