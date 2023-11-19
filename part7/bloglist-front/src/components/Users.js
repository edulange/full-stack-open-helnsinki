/* eslint-disable */
import { useEffect } from "react"
import userService from "../services/users"
import { useDispatch, useSelector } from "react-redux"
import { setAllUsers } from "../reducers/allUsersReducer"

const Users = () => {
	const dispatch = useDispatch()
	const allUsers = useSelector((state) => state.allUsers.allUsers)

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await userService.getAll()
				dispatch(setAllUsers(response))
			} catch (error) {
				console.error("Error fetching users:", error)
			}
		}

		fetchUsers()
	}, [dispatch])

	return (
		<div>
			<h2>Users</h2>
			<ul>
				{allUsers.map((user) => (
					<li key={user.id}>
						{user.name} ({user.username}) 
					</li>
				))}
			</ul>
		</div>
	)
}

export default Users
