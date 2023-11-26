const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const middleware = require('../utils/middleware')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog

    .find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs)
  })


  blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  })
  
  blogsRouter.post('/', middleware.tokenExtractor, async (request, response) => {
    const body = request.body
    
  
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (!body.title || !body.url) {
      return response.status(400).json({ error: 'title or url missing' })
    }

    const blog = new Blog({
      url: body.url,
      title: body.title,
      author: body.author,
      user: user._id,
      likes: body.likes === undefined ? 0 : body.likes // Define likes como 0 se não estiver presente no objeto
    })


    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    
    response.status(201).json(savedBlog)
  })

  blogsRouter.delete('/:id', middleware.tokenExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
  
    if (!decodedToken.id || !blog.user || (blog.user.toString() !== decodedToken.id.toString())) {
      return response.status(401).json({ error: 'token invalid or user unauthorized' })
    }
  
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })

  blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
  
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0
    }
  
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  })

  blogsRouter.post('/:id/comments', middleware.tokenExtractor, async (request, response) => {
    try {
      const { id } = request.params;
      const { comment } = request.body;
  
      console.log('Blog ID:', id);
      console.log('Comment:', comment);
  
      const blog = await Blog.findById(id);
  
      if (!blog) {
        console.error('Blog not found');
        return response.status(404).json({ error: 'Blog not found' });
      }
  
      // Certifique-se de que o array de comentários seja inicializado
      blog.comments = blog.comments || [];
  
      // Agora você pode usar o método concat sem problemas
      blog.comments = blog.comments.concat(comment);
  
      const updatedBlog = await blog.save();
  
      console.log('Blog updated:', updatedBlog);
  
      response.status(201).json(updatedBlog);
    } catch (error) {
      console.error('Unhandled error:', error);
      response.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  

  module.exports = blogsRouter