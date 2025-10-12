import React from 'react';
import './App.css';
import TodoList from './components/TodoList.jsx'; // ✅ import your TodoList component

function App() {
  return (
    <div className="App">
      <h1>My Todo List</h1>
      <TodoList />  {/* ✅ render it here */}
    </div>
  );
}

export default App;