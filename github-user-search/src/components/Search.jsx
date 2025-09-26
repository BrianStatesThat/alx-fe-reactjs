import { useState } from 'react';
import { advancedUserSearch, fetchUserData } from '../services/githubService';

function Search() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [results, setResults] = useState([]);
  const [singleUser, setSingleUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const handleAdvancedSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setResults([]);
    setSingleUser(null);
    try {
      const data = await advancedUserSearch({ username, location, minRepos, page });
      setResults(data.items || []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSingleUserSearch = async () => {
    if (!username) return;
    setLoading(true);
    setError(false);
    setResults([]);
    setSingleUser(null);
    try {
      const user = await fetchUserData(username);
      setSingleUser(user);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);
    try {
      const data = await advancedUserSearch({ username, location, minRepos, page: nextPage });
      setResults(prev => [...prev, ...(data.items || [])]);
      setPage(nextPage);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-black rounded shadow">
      <form className="space-y-4" onSubmit={handleAdvancedSearch}>
        <input
          className="w-full px-3 py-2 border rounded"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 border rounded"
          type="text"
          placeholder="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
        <input
          className="w-full px-3 py-2 border rounded"
          type="number"
          min="0"
          placeholder="Minimum Repositories"
          value={minRepos}
          onChange={e => setMinRepos(e.target.value)}
        />
        <div className="flex gap-2">
          <button className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700" type="submit">
            Advanced Search
          </button>
          <button
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
            type="button"
            onClick={handleSingleUserSearch}
          >
            Search by Username
          </button>
        </div>
      </form>

      {loading && <p className="mt-4 text-blue-600">Loading...</p>}
      {error && <p className="mt-4 text-red-600">Looks like we cant find the user</p>}

      {/* Single user result */}
      {singleUser && (
        <div className="flex items-center mt-6 p-3 border rounded">
          <img src={singleUser.avatar_url} alt={singleUser.login} className="w-16 h-16 rounded-full object-cover mr-4" />
          <div>
            <a href={singleUser.html_url} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-blue-700">
              {singleUser.login}
            </a>
            <p className="text-sm text-gray-600">Location: {singleUser.location || 'N/A'}</p>
            <p className="text-sm text-gray-600">Repos: {singleUser.public_repos ?? 'N/A'}</p>
          </div>
        </div>
      )}

      {/* Advanced search results */}
      <div className="mt-6">
        {results.map(user => (
          <div key={user.id} className="flex items-center mb-4 p-3 border rounded">
            <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full object-cover mr-4" />
            <div>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-blue-700">
                {user.login}
              </a>
              <p className="text-sm text-gray-600">Location: {user.location || 'N/A'}</p>
              <p className="text-sm text-gray-600">Repos: {user.public_repos ?? 'N/A'}</p>
            </div>
          </div>
        ))}
        {results.length > 0 && (
          <button
            className="mt-4 w-full bg-gray-200 py-2 rounded hover:bg-gray-300"
            onClick={handleLoadMore}
            disabled={loading}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

export default Search;