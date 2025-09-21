import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Search from './components/Search';
import './App.css';

function Profile() {
  return <div>Profile Page (Coming Soon)</div>;
}

function App() {
  return (
    <Router>
      <div className="App">
        <h1>GitHub User Search</h1>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
