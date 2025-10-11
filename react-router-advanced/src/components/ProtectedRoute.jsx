import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  // Simulate auth check
  return localStorage.getItem('auth') === 'true';
};

export default function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/" replace />;
}