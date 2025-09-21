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

export async function advancedUserSearch({ username, location, minRepos, page = 1 }) {
  let query = '';
  if (username) query += `${username} `;
  if (location) query += `location:${location} `;
  if (minRepos) query += `repos:>=${minRepos} `;
  query = query.trim();

  const headers = GITHUB_API_KEY
    ? { Authorization: `token ${GITHUB_API_KEY}` }
    : {};

  const response = await axios.get(
    `https://api.github.com/search/users?q=${encodeURIComponent(query)}&page=${page}&per_page=10`,
    { headers }
  );

  // For each user, fetch more details (location, repo count)
  const users = await Promise.all(
    response.data.items.map(async user => {
      try {
        const userDetails = await axios.get(user.url, { headers });
        return { ...user, ...userDetails.data };
      } catch {
        return user;
      }
    })
  );

  return { ...response.data, items: users };
}