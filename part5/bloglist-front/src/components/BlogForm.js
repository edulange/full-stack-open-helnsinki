import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }
  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <div>
						Title:{' '}
            <input
              type="text"
              name="Title"
              value={newBlogTitle}
              onChange={({ target }) =>
                setNewBlogTitle(target.value)
              }
            />
          </div>
          <div>
						Author:{' '}
            <input
              type="text"
              name="Author"
              value={newBlogAuthor}
              onChange={({ target }) =>
                setNewBlogAuthor(target.value)
              }
            />
          </div>
          <div>
						Url:{' '}
            <input
              type="text"
              name="Url"
              value={newBlogUrl}
              onChange={({ target }) =>
                setNewBlogUrl(target.value)
              }
            />
          </div>
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
