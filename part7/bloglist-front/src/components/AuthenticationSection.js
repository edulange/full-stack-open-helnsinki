/* eslint-disable */
import React from "react"
import Togglable from "./Togglable"
import BlogForm from "./BlogForm"

const AuthenticationSection = ({
	user,
	handleLogin,
	logOutButton,
	blogFormRef,
	addBlog,
}) => (
	<>
		{!user && handleLogin()}
		{user && (
			<div>
				<p>{user.name} logged in</p>
				{logOutButton()}
				<Togglable buttonLabel="New Blog" ref={blogFormRef}>
					<BlogForm createBlog={addBlog} />
				</Togglable>
			</div>
		)}
	</>
)

export default AuthenticationSection

