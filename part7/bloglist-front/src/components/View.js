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
		<div className='flex items-center justify-center h-full'>
			<div className='p-4 border rounded-md shadow-md'>
				<h2 className='text-xl font-bold mb-4'>{blog.title}</h2>
				<p className='mb-2 italic'>{blog.url}</p>
				<p className='mb-2'>
					Likes {blog.likes}{' '}
					<button
						onClick={() => handleUpdateLikes(blog.id, blog.likes + 1)}
						className='bg-blue-500 text-white px-2 py-1 rounded-md'
					>
						Like 👍
					</button>
				</p>
				<p className='mb-2'>{blog.author}</p>
				{findUser() === blog.user && (
					<p>
						<button onClick={handleDelete} className='bg-red-500 text-white px-2 py-1 rounded-md'>
							delete
						</button>
					</p>
				)}
				<h3 className='text-lg font-bold mb-2'>Comments</h3>
				<form onSubmit={handleCommentSubmit} className='mb-4'>
					<input
						type='text'
						value={commentText}
						onChange={(e) => setCommentText(e.target.value)}
						className='border rounded-md p-2 mr-2'
					/>
					<button type='submit' className='bg-green-500 text-white px-2 py-1 rounded-md'>
						add comment
					</button>
				</form>
				<ul>
					{comments.map((comment) => {
						return (
							<li key={comment._id} className='mb-2 text-blue-500 italic'>
								{/* eu tive qeu colocar._id por casua do schema dele */}
								{comment.text}
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export default BlogDetails
