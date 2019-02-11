const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())

morgan.token('data', (req, res) => {
    if (req.method = 'POST')
        return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let persons = [
    {
        "persons": [
            {
                "name": "Arttu Hella",
                "number": "050-214555",
                "id": 1
            },
            {
                "name": "Marto Märvinen",
                "number": "040-863456",
                "id": 3
            },
            {
                "name": "Lea Kutvos",
                "number": "040-123456",
                "id": 4
            },
            {
                "name": "Tuure Piitulainen",
                "number": "050-666",
                "id": 5
            },
            {
                "name": "Mikael Kosola",
                "number": "050-1244",
                "id": 6
            },
            {
                "name": "Tuuba Korhonen",
                "number": "050-7557057",
                "id": 7
            }
        ]
    }
]

const randomId = () => Math.floor(Math.random() * 100000)

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    const currentDate = new Date()
    const info = `<p> Puhelinluettelossa ${persons[0].persons.length} henkilön tiedot </p>
                  <p> ${currentDate} </p>`
    res.send(info)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons[0].persons.find(person => person.id === id)
    if (person)
        res.json(person)
    else
        res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons[0].persons.filter(person => person.id !== id);
    res.status(204).end();
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (body.name === undefined || body.number === undefined)
        res.status(400).json({
            error: 'content missing'
        })
    
    if (persons[0].persons.find(person => person.name === body.name))
        res.status(400).json({
            error: 'name must be unique'
        })

    const person = {
        name: body.name,
        number: body.number,
        id: randomId()
    }

    persons[0].persons.concat(person)
    res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})