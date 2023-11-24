/* eslint-disable */
import { Link } from "react-router-dom";
import { useEffect } from "react";
import userService from "../services/users";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "../reducers/allUsersReducer";

const Users = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers.allUsers);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAll();
        dispatch(setAllUsers(response));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs Count</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
