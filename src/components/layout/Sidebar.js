import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Settings,
  Menu,
  X,
  PawPrint,
  Syringe,
  LogOut
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard', path: '/dashboard' },
    { id: 'users', icon: Users, label: 'Users', path: '/users' },
    { id: 'pets', icon: PawPrint, label: 'Pets', path: '/pets' },
    { id: 'treatments', icon: Syringe, label: 'Treatments', path: '/treatments' },
    { id: 'settings', icon: Settings, label: 'Settings', path: '/settings' },
    { id: 'logout', icon: LogOut, label: 'Logout', path: '/logout' }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
      
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        {/* Logo/Header */}
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">A</div>
            <span className="logo-text">Admin Pro</span>
          </div>
          <button className="close-btn" onClick={toggleSidebar}>
            <X size={20} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={toggleSidebar}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile at bottom */}
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">JD</div>
            <div className="user-info">
              <div className="user-name">John Doe</div>
              <div className="user-role">Administrator</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;