/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import userService from '../services/users'
import { setAllUsers } from '../reducers/allUsersReducer'

const BlogDetails = ({ toggleDetail }) => {
	const { id } = useParams()
	const [blog, setBlog] = useState(null)
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user)
	const allUsers = useSelector((state) => state.allUsers.allUsers)

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
  
	console.log('nao vai dar hj =(')

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

	const handleUpdateLikes = (id, newLikes) => {
		blogService
			.update(id, { likes: newLikes })
			.then((updatedBlog) => {
				dispatch(updateBlog({ id, updatedBlog: { id, likes: newLikes } }))
			})
			.catch((error) => {
				console.error('Error updating likes:', error)
			})
	}

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
  console.log('allUsers :>> ', allUsers);

	return (
		<div style={blogStyle} className='blog-details'>
			{blog.title}{' '}
			<button className='hide-btn' onClick={toggleDetail}>
				hide
			</button>{' '}
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
		</div>
	)
}

export default BlogDetails
