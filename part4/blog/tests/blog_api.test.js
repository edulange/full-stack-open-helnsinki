const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
  
    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)

  })

test('blog post has id property', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]

    expect(blog.id).toBeDefined()
})

test('a valid blog can be added with token', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'John Doe',
    url: 'https://newblog.com',
    likes: 0
  }

  const user = await User.findOne({})
  const token = jwt.sign({ username: user.username, id: user._id }, process.env.SECRET)

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain('New Blog')
})

test('adding a new blog without a token fails with status code 401', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'John Doe',
    url: 'https://newblog.com',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})  


  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'Edudu',
      url: 'http:meuovo',
      likes: 20,
    }
 
    const user = await User.findOne({})
    const token = jwt.sign({ username: user.username, id: user._id }, process.env.SECRET)

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
  
  test('blog without url is not added', async () => {
    const newBlog = {
      title: 'Valido',
      author: 'Edudu',
      likes: 20,
    }

    const user = await User.findOne({})
    const token = jwt.sign({ username: user.username, id: user._id }, process.env.SECRET)
  
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })


afterAll(async () => {
  await mongoose.connection.close()
})