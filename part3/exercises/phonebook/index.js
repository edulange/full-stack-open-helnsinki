console.log('tentado colocar o db')

const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (req, res) => {
    res.send('<h1> Hello vorld! </h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

console.log('está funcionando ainda?')
console.log('sim, estou vendo no cmder')

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0
    return maxId + 1
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
        date: new Date()
    }

    persons = persons.concat(person)

    response.json(person)
})

app.get('/info', (request, response) => {
    const actualDate = new Date()
    response.send(`Phonebook has info for ${persons.length} people
    <br>${actualDate}<br>`)

})

const PORT = 3001
app.listen(PORT)
console.log(`Server running na porta ${PORT}`)