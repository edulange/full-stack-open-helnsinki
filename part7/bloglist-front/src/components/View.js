/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'

const BlogDetails = () => {
	const { id } = useParams()
	const [blog, setBlog] = useState(null)
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)
	const allUsers = useSelector((state) => state.allUsers.allUsers)
	const [newComm, setNewComment] = useState('');
	const [comms, setComments] = useState([]);

	const deleteStyle = {
		color: 'red',
	}

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	}


	useEffect(() => {
		blogService
			.getSingleBlog(id)
			.then((retrievedBlog) => {
				setBlog(retrievedBlog)
			})
			.catch((error) => {
				console.error('Error fetching blog details:', error)
			})
	}, [id])

	const handleUpdateLikes = async (id, newLikes) => {
		try {
		  const updatedBlog = await blogService.update(id, { likes: newLikes });
		  setBlog(updatedBlog); // Atualiza o estado local do blog
		  dispatch(updateBlog({ id, updatedBlog: { id, likes: newLikes } }));
		} catch (error) {
		  console.error('Error updating likes:', error);
		}
	  };
	  

	const handleDelete = async () => {
		if (window.confirm(`Do you really want to delete ${blog.title} this blog?`)) {
			try {
				await blogService.remove(blog.id)
				dispatch(removeBlog(blog.id))
			} catch (error) {
				console.error('Error deleting blog:', error)
			}
		}
	}
	// Se o blog ainda não foi carregado, mostrar uma mensagem de carregamento
	if (!blog) {
		return <p>Loading...</p>
	}

	function findUser() {
		const foundUser = allUsers.find((u) => u.username === user.user.username)
		return foundUser.id
	}

	const handleAddComment = async () => {
		try {
		  const newCommentText = newComm.trim();
		  if (newCommentText === '') return;
	  
		  const updatedBlog = await blogService.addComment(blog.id, newCommentText);
		  console.log('Updated Blog after adding comment:', updatedBlog);
	  
	  
		  // Certifique-se de verificar se a propriedade comments existe antes de atualizar o estado
		  if (updatedBlog && updatedBlog.comments) {
			setComments(updatedBlog.comments);
		  } else {
			console.error('Invalid blog structure after adding comment:', updatedBlog);
		  }
	  
		  setNewComment('');
		} catch (error) {
		  console.error('Error adding comment:', error);
		}
	  };

	return (
		<div style={blogStyle} className='blog-details'>
			{blog.title}{' '}
			<br />
			{blog.url} <br />
			Likes {blog.likes}{' '}
			<button onClick={() => handleUpdateLikes(blog.id, blog.likes + 1)} className='like-btn'>
				like
			</button>{' '}
			<br />
			{blog.author}
			{findUser() === blog.user && (
				<p>
					<button style={deleteStyle} onClick={handleDelete} className='delete'>
						delete
					</button>
				</p>
			)}
      <h3>Comments</h3>
      <input
        type='text'
        value={newComm}
        onChange={({ target }) => setNewComment(target.value)}
      />
      <button onClick={handleAddComment}>add comment</button>
      <ul>
        {comms.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
		</div>
	)
}

export default BlogDetails
