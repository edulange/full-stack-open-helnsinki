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
    <div className="p-4 text-center" >
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Username</th>
            <th className="border p-2">Blogs Count</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.id} className="border">
              <td className="border p-2">
                <Link to={`/users/${user.id}`} className="text-blue-500 hover:underline font-bold">{user.username}</Link>
              </td>
              <td className="border p-2">{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
