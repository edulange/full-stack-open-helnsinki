/* eslint-disable */

import axios from "axios"
const baseUrl = "api/users"

// userService.js
const getAll = async () => {
    try {
      const response = await axios.get(baseUrl);
      console.log('Response from API:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };
  

export default { getAll }
