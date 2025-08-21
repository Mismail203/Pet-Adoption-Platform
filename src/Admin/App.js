import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/users/Users';
import Pets from './pages/pets/Pets';
import Treatments from './pages/treatments/Treatments';
import Payments from './pages/payments/Payments';
import Settings from './pages/settings/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import { Loader } from 'lucide-react';
import './App.css';

export default function AdminApp() {
  console.log('Admin App rendered');

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
    setIsLoading(false);
    console.log('Auth?', !!token);
  }, []);

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div className="app-loading"><Loader className="spinner" size={48} /></div>;
  }

  // simple layout wrapper for protected pages
  const Layout = ({ children }) => (
    <>
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} onLogout={handleLogout} />
      <div className="content-wrapper">
        <Sidebar isOpen={sidebarOpen} />
        <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          {children}
        </div>
      </div>
    </>
  );
  // define this variable to fix error on mobile view
  const resizeObserverErr = e => {
    if (
      e.message ===
      'ResizeObserver loop completed with undelivered notifications.'
    ) {
      return;
    }
    console.error(e);
  };

  window.addEventListener('error', resizeObserverErr);

  return (
    <div className="app-container">
      <Routes>
        {/* relative paths! now these resolve under /admin/... */}
        <Route
          path="login"
          element={
            isAuthenticated
              ? <Navigate to="dashboard" replace />
              : <Login onLogin={handleLogin} />
          }
        />

        <Route path="logout" element={<Logout onLogout={handleLogout} />} />

        {/* Protected block */}
        <Route
          path=""
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout><Dashboard /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout><Dashboard /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="users"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout><Users /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="pets"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout><Pets /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="treatments"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout><Treatments /></Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="payments/:status"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout><Payments /></Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="payments"
          element={<Navigate to="payments/paid" replace />}
        />

        <Route
          path="settings"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout><Settings /></Layout>
            </ProtectedRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to={isAuthenticated ? '/admin/dashboard' : '/admin/login'} replace />} />
      </Routes>
    </div>
  );
}
