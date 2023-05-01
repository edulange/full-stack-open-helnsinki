const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

   // Check if required fields are present
   if (!username || !name || !password) {
    return response.status(400).json({ error: 'Missing fields' })
  }

  // Check if username and name meet minimum length requirement
  if (username.length < 3 || name.length < 3) {
    return response.status(400).json({ error: 'Username and name must be at least 3 characters long' })
  }

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')

  response.json(users)
})

usersRouter.delete('/:id', async (request, response) => {
  const userId = request.params.id

  await User.findByIdAndDelete(userId)

  response.status(204).end()
})

module.exports = usersRouter