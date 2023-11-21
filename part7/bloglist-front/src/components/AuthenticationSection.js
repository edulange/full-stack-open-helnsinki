/* eslint-disable */
import React from 'react'


const AuthenticationSection = ({
	user,
	handleLogin,
	logOutButton,
}) => (
	<>
		{!user && handleLogin()}
		{user && (
			<div>
				<p>{user.name} logged in</p>
				{logOutButton()}
			</div>
		)}
	</>
)

export default AuthenticationSection

