const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: String,
});


const blogSchema = new mongoose.Schema({
    url: String,
    title: String,
    author: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    likes: Number,
    comments: [commentSchema]  // Adicionando a propriedade de comentários

  })

  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      console.log('returnedObject :>> ', returnedObject);
    }
  })

  module.exports = mongoose.model('Blog', blogSchema)