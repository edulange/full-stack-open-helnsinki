/* eslint-disable */
import { Link } from 'react-router-dom'

const BlogList = ({ blog, user }) => {
	if (user !== null) {
		return (
			<>
				<div className='mb-4 p-4 border rounded-md'>
					<div className='flex justify-between items-center'>
						<div>
							<h3 className='text-xl font-bold mb-2'>{blog.title}</h3>
							<span className='text-gray-500'>{blog.author}</span>
						</div>
						<div>
							<Link to={`/blogs/${blog.id}`}>
								<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
									View
								</button>
							</Link>
						</div>
					</div>
				</div>
			</>
		)
	}

	return null
}

export default BlogList
