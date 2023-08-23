import blogService from '../services/blogs'

// Functions that are used blog actions.
// Blogs have two actions, adding like to the blog or removing the blog

// uses blogService to add a like to blog
// and shows a success messagge (or error message)
export const addLike = async (blog, setLikes, showSuccessMessage, showErrorMessage) => {
  try {
    const updatedLikes = blog.likes + 1

    // Atualiza o estado com o novo valor de likes antes de fazer a chamada à API
    setLikes(updatedLikes)
    console.log('Updated Likes:', updatedLikes) // Add this line

    // Faz a chamada à API para atualizar os likes
    const returnedBlog = await blogService.updateLike(blog.id, { ...blog, likes: updatedLikes })

    showSuccessMessage(`You liked blog "${returnedBlog.title}" which has now ${returnedBlog.likes} likes in total!`)
  } catch (error) {
    showErrorMessage('sorry, something went wrong: ' + error.response.data.error)
  }
}

// uses blogService to remove a blog
// asks confirmation from the user for delete
// with success shows a success messagge and removes the blog from the bloglist
// with error shows a error message
export const removeBlog = (blog, blogs, setBlogs, showSuccessMessage, showErrorMessage) => {
  const blogId = blog.id
  const blogTitle = blog.title

  if (window.confirm(`Remove ${blogTitle}?`)) {

    blogService
      .remove(blogId)
      .then(() => {
        showSuccessMessage(`You removed blog "${blogTitle}"`)
        setBlogs(blogs.filter(n => n.id !== blogId))
      })
      .catch(error => {
        showErrorMessage('You cannot remove blogs added by another user: ' + error.response.data.error)
      })

  }
}
