import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Users from './pages/users/Users';
import Pets from './pages/pets/Pets';
import Treatments from './pages/treatments/treatments';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="app-container">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="content-wrapper">
          <Sidebar isOpen={sidebarOpen} />
          <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/pets" element={<Pets />} />
              <Route path="/treatments" element={<Treatments />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;