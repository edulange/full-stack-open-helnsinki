/* eslint-disable */

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser as loginUserAction } from '../reducers/userReducer';
import blogService from '../services/blogs';

const useUserInitialization = () => {
  const dispatch = useDispatch();

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
