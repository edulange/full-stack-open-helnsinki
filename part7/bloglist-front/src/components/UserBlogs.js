/* eslint-disable */

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { setBlogs } from '../reducers/blogReducer'

const UserBlogs = () => {
	const { id } = useParams()
	const dispatch = useDispatch()

	const allBlogs = useSelector((state) => state.blog.blogs)

	useEffect(() => {
		const fetchUserBlogs = async () => {
			try {
				const userBlogs = await blogService.getAll(id)
				dispatch(setBlogs(userBlogs))
			} catch (error) {
				console.error('Error fetching user blogs:', error)
			}
		}

		fetchUserBlogs()
	}, [id, dispatch])

	const userBlogs = allBlogs.filter((blog) => blog.user.id === id)
    const userName = userBlogs.length > 0 ? userBlogs[0].user.name : 'Unknown User';

	return (
		<div>
			<h2>{userName} Blogs</h2>
            <ul>
			{userBlogs.map((blog) => (
				<div key={blog.id}>
					<li>{blog.title}</li>
				</div>
			))}
            </ul>
		</div>
	)
}

export default UserBlogs
