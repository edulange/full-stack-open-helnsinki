const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://edugod:${password}@notesdb.ienxfpp.mongodb.net/NoteApp?retryWrites=true&w=majority`
mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'or might work',
  date: new Date(),
  important: false,
})

/*
note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})

*/
Note.find({important: false }).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
