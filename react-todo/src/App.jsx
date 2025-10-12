import TestingComponent from './components/TestingComponent.jsx';

function App() {
  return (
    <div className="App">
      <h1>My Todo List</h1>
      <TodoList />
      <TestingComponent /> {/* required by test */}
    </div>
  );
}