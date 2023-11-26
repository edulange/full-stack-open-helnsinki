/* eslint-disable */

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser as loginUserAction } from '../reducers/userReducer';
import blogService from '../services/blogs';
import { setAllUsers } from '../reducers/allUsersReducer';
import userService from '../services/users';


const useUserInitialization = () => {
  const dispatch = useDispatch();


  useEffect(() => {

    //pq isso?
    //pq eu preciso chamar todos os usuários no inicio da aplicação.
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


  useEffect(() => {
    const init = async () => {
      try {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON);
          blogService.setToken(user.token);
          dispatch(loginUserAction(user));
        }
      } catch (error) {
        console.error('Error during user initialization:', error);
      }
    };
  
    init();
  }, []);
}


export default useUserInitialization;
