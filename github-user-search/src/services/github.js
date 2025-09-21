import axios from 'axios';

export const searchUsers = async (username) => {
  const response = await axios.get(`https://api.github.com/search/users?q=${username}`);
  return response.data;
};