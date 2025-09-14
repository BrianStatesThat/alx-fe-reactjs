import React from 'react';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import './App.css';

function App() {
  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem', background: '#f8f9fa', borderRadius: 8 }}>
      <h1>Recipe Sharing App</h1>
      <AddRecipeForm />
      <RecipeList />
    </div>
  );
}

export default App;
