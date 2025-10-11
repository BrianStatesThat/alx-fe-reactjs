import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import BlogPost from './components/BlogPost';
import Profile from './components/Profile';
import NotFound from './components/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogPost />} /> {/* ✅ Required dynamic route */}
        <Route path="/profile/*" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;