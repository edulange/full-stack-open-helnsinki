/* eslint-disable */

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { setBlogs } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

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
	const userName = userBlogs.length > 0 ? userBlogs[0].user.name : 'Unknown User'

	return (
		<div className='flex items-center justify-center h-full'>
			<div className='p-4 text-center'>
				<h2 className='text-2xl font-bold mb-4'>{userName} Blogs</h2>
				<ul className='list-disc pl-4'>
					{userBlogs.map((blog) => (
						<li key={blog.id} className='mb-2'>
							<Link to={`/blogs/${blog.id}`} className='text-blue-500 hover:underline'>
								{blog.title}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default UserBlogs
