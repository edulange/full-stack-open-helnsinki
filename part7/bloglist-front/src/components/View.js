/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
import { useParams, useNavigate } from 'react-router-dom'

const BlogDetails = () => {
	const { id } = useParams()
	const [blog, setBlog] = useState(null)
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)
	const allUsers = useSelector((state) => state.allUsers.allUsers)
	const [commentText, setCommentText] = useState('')
	const [comments, setComments] = useState([])

	const navigate = useNavigate()

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
		const fetchData = async () => {
			try {
				const retrievedBlog = await blogService.getSingleBlog(id)
				setBlog(retrievedBlog)
				setComments(retrievedBlog.comments || [])
			} catch (error) {
				console.error('Error fetching blog details:', error)
			}
		}

		fetchData()
	}, [id])

	const handleUpdateLikes = async (id, newLikes) => {
		try {
			const updatedBlog = await blogService.update(id, { likes: newLikes })
			setBlog(updatedBlog) // Atualiza o estado local do blog
			dispatch(updateBlog({ id, updatedBlog: { id, likes: newLikes } }))
		} catch (error) {
			console.error('Error updating likes:', error)
		}
	}

	const handleDelete = async () => {
		if (window.confirm(`Do you really want to delete ${blog.title} this blog?`)) {
			try {
				await blogService.remove(blog.id)
				dispatch(removeBlog(blog.id))
				navigate('/')
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

	const handleCommentSubmit = async (event) => {
		event.preventDefault()
		try {
			await blogService.addComment(blog.id, commentText)
			// Fetch the updated blog details with comments
			const updatedBlog = await blogService.getSingleBlog(blog.id)
			// Append the new comment to the existing comments
			setComments(updatedBlog.comments || [])
			// Clear the comment text
			setCommentText('')
		} catch (error) {
			console.error('Error adding comment:', error.message)
		}
	}

	return (
		<div style={blogStyle} className='blog-details'>
			{blog.title} <br />
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
			<h3>Comentários</h3>
			<form onSubmit={handleCommentSubmit}>
				<input
					type='text'
					id='commentText'
					value={commentText}
					onChange={(e) => setCommentText(e.target.value)}
				/>
				<button type='submit'>add comment</button>
			</form>
			<ul>
				{comments.map((comment) => {
					return (
						<li key={comment._id}> {/* eu tive qeu colocar._id por casua do schema dele */}
							<strong>{comment.user}</strong>: {comment.text}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default BlogDetails
