import React, { useState, useEffect } from 'react'; // Added useEffect import
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout'; // Added Logout import
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/users/Users';
import Pets from './pages/pets/Pets';
import Treatments from './pages/treatments/treatments';
import Settings from './pages/settings/Settings';
import ProtectedRoute from './components/ProtectedRoute'; // Added ProtectedRoute import
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing auth on initial load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('authToken', 'admin');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app-container">
        {!isAuthenticated ? (
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        ) : (
          <>
            <Header
              toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              onLogout={handleLogout}
            />
            <div className="content-wrapper">
              <Sidebar isOpen={sidebarOpen} />
              <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
                <Routes>
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/users" element={
                    <ProtectedRoute>
                      <Users />
                    </ProtectedRoute>
                  } />
                  <Route path="/pets" element={
                    <ProtectedRoute>
                      <Pets />
                    </ProtectedRoute>
                  } />
                  <Route path="/treatments" element={
                    <ProtectedRoute>
                      <Treatments />
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } />
                  <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                  />
                </Routes>
              </div>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;