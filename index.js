const express = require('express')
const app = express()

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

const currentDate = new Date()

const info = `<p> Puhelinluettelossa ${persons[0].persons.length} henkilön tiedot </p>
              <p> ${currentDate} </p>`

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(info)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})