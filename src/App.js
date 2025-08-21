import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Admin from "./Admin/App"; //define admin panel here
import UserApp from "./User/App"; // ✅ Renamed import to UserApp

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/app" replace />} />{" "}
        {/* default admin route here will change later */}
        <Route
          path="admin/"
          element={<Navigate to="/admin/login" replace />}
        />{" "}
        {/* Route admin here */}
        <Route path="/admin/*" element={<Admin />} /> {/* Route admin here */}
        <Route path="/app/*" element={<UserApp />} />{" "}
        {/* ✅ Updated to UserApp and path */}
      </Routes>
    </Router>
  );
}
