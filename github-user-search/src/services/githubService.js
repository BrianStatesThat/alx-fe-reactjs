import axios from 'axios';

const GITHUB_API_KEY = import.meta.env.VITE_APP_GITHUB_API_KEY;

export async function fetchUserData(username) {
  try {
    const headers = GITHUB_API_KEY
      ? { Authorization: `token ${GITHUB_API_KEY}` }
      : {};
    const response = await axios.get(
      `https://api.github.com/users/${username}`,
      { headers }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}