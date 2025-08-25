import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar-user">
      <nav className="nav-user">
        <NavLink
          to="/app/dashboard"
          end
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          <span>🏠</span>
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/app/pets"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          <span>🐾</span>
          <span>Pets</span>
        </NavLink>

        <NavLink
          to="/app/treatment"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          <span>💊</span>
          <span>Treatment</span>
        </NavLink>
        <NavLink
          to="/app/logout"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          <span>🚪</span>
          <span>Logout</span>
        </NavLink>
      </nav>
    </aside>
  );
}
