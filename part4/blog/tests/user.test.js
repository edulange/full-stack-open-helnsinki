const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')


describe('when there is initially one user in the database', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      const passwordHash = await bcrypt.hash('secret', 10)
      const user = new User({name:'eduardo', username: 'root', passwordHash })
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await User.find({})
  
      const newUser = {
        username: 'edugod',
        name: 'Eduardo',
        password: 'senha123'
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await User.find({})
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(user => user.username)
      expect(usernames).toContain(newUser.username)
    })
  
    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await User.find({})
  
      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen'
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      expect(result.body.error).toContain('`username` to be unique')
  
      const usersAtEnd = await User.find({})
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })


afterAll(() => {
  mongoose.connection.close()
})