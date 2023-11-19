/* eslint-disable */
import React, { useEffect, useState } from 'react';
import userService from '../services/users';

const Users = () => {
    const [users, setUsers] = useState([]);


useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await userService.getAll();
      console.log('Users from API:', response);
      setUsers(response);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  fetchUsers();
}, []);
console.log('users :>> ', users);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.username})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
