import { useState } from 'react';
import { advancedUserSearch } from '../services/githubService';

function Search() {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setResults([]);
    try {
      const data = await advancedUserSearch({ username, location, minRepos, page });
      setResults(data.items || []);
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
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <form className="space-y-4" onSubmit={handleSubmit}>
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
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" type="submit">
          Search
        </button>
      </form>

      {loading && <p className="mt-4 text-blue-600">Loading...</p>}
      {error && <p className="mt-4 text-red-600">Looks like we cant find the user</p>}
      <div className="mt-6">
        {results.map(user => (
          <div key={user.id} className="flex items-center mb-4 p-3 border rounded">
            <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full mr-4" />
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