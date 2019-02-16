const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://tuure:${password}@cluster0-nbpbn.mongodb.net/test?retryWrites=true`

console.log(url)

mongoose.connect(url, { useNewUrlParser: true })

const Person = mongoose.model('Person', {
  name: String,
  number: String,
})

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('puhelinluettelo:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else {
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({ name, number })
  person.save().then(response => {
    console.log(`lisätään ${name} numero ${number} luetteloon`)
    mongoose.connection.close()
  })
}
