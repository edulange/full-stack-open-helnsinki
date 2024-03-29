const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')

const app = express()
app.use(bodyParser.json())

logger.token('body', (req, res) => {
    return JSON.stringify(req.body)
})

app.use(logger(':method :url :status :res[content-length] - :response-time ms :body'))



app.use(express.json())
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));


console.log('até aqui ok')
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
    return Math.floor((Math.random() * 100000) + 1)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    

    if(!body.name) {
        return response.status(400).json({
            error: 'name content missing'
        })
    }
    if(!body.number) {
        return response.status(400).json({
            error: 'number content missing'
        })
    }
    
    const isUniqueName = persons.find(person => body.name === person.name)
    const isUniqueNumber = persons.find(person => body.number === person.number)
    
    if(!isUniqueName) {
        console.log("name is unique")
    } else {
        return response.status(409).json({
            error: "name should be unique"
        })
    }
    if(!isUniqueNumber) {
        console.log("number is unique")
    } else {
        return response.status(409).json({
            error: "number should be unique"
        })
    }
    
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
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