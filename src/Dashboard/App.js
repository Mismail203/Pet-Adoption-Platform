import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import "./App.css";

// Layout components
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";

// Pages
import DashboardHome from "./pages/Dashboard";
import Pets from "./pages/Pets";
import Treatment from "./pages/Treatment";
import Logout from "./pages/Logout";

export default function DashboardApp() {
  return (
    <div className="dashboard-app">
      <Header />
      <div className="dashboard-body">
        <Sidebar />
        <main className="dashboard-content">
          <Routes>
            <Route path="/" element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardHome />} />
            <Route path="pets" element={<Pets />} />
            <Route path="treatment" element={<Treatment />} />
            <Route path="logout" element={<Logout />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </main>
      </div>
      <footer className="dashboard-footer">
        <div className="container">
          <span>© {new Date().getFullYear()} Pet Adoption</span>
          <nav>
            <Link to="/app">Home</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
