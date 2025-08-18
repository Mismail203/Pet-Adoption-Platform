import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Admin from './Admin/App'; //define admin panel here

export default function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/admin/login" replace />} /> {/* default admin route here will change later */}
      <Route path="admin/" element={<Navigate to="/admin/login" replace />} /> {/* Route admin here */}
      <Route path="/admin/*" element={<Admin />} /> {/* Route admin here */}
      </Routes>
    </Router>
  );
}
