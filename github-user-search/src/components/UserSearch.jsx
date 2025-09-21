import { useState } from 'react';
import { searchUsers } from '../services/github';

function UserSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (query) {
      const data = await searchUsers(query);
      setResults(data.items || []);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search GitHub users"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map(user => (
          <li key={user.id}>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              {user.login}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserSearch;