import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/users/Users';
import Pets from './pages/pets/Pets';
import Treatments from './pages/treatments/treatments';
import Settings from './pages/settings/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import { Loader } from 'lucide-react';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="app-loading">
        <Loader className="spinner" size={48} />
      </div>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          } />

          <Route path="/logout" element={
            <Logout onLogout={handleLogout} />
          } />

          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Header
                toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                onLogout={handleLogout}
              />
              <div className="content-wrapper">
                <Sidebar isOpen={sidebarOpen} />
                <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
                  <Dashboard />
                </div>
              </div>
            </ProtectedRoute>
          } />

          <Route path="/dashboard" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Header
                toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                onLogout={handleLogout}
              />
              <div className="content-wrapper">
                <Sidebar isOpen={sidebarOpen} />
                <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
                  <Dashboard />
                </div>
              </div>
            </ProtectedRoute>
          } />

          <Route path="/users" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Header
                toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                onLogout={handleLogout}
              />
              <div className="content-wrapper">
                <Sidebar isOpen={sidebarOpen} />
                <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
                  <Users />
                </div>
              </div>
            </ProtectedRoute>
          } />

          <Route path="/pets" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Header
                toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                onLogout={handleLogout}
              />
              <div className="content-wrapper">
                <Sidebar isOpen={sidebarOpen} />
                <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
                  <Pets />
                </div>
              </div>
            </ProtectedRoute>
          } />

          <Route path="/treatments" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Header
                toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                onLogout={handleLogout}
              />
              <div className="content-wrapper">
                <Sidebar isOpen={sidebarOpen} />
                <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
                  <Treatments />
                </div>
              </div>
            </ProtectedRoute>
          } />

          <Route path="/settings" element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Header
                toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                onLogout={handleLogout}
              />
              <div className="content-wrapper">
                <Sidebar isOpen={sidebarOpen} />
                <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
                  <Settings />
                </div>
              </div>
            </ProtectedRoute>
          } />

          <Route path="*" element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;