import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  ChevronDown,
  Settings,
  User,
  LogOut
} from 'lucide-react';
import './Header.css';

const Header = ({ toggleSidebar, pageTitle = "Dashboard" }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const notifications = [
    { id: 1, message: "New user registered", time: "2 mins ago", unread: true },
    { id: 2, message: "Order #1234 completed", time: "5 mins ago", unread: true },
    { id: 3, message: "Server backup completed", time: "1 hour ago", unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="header">
      <div className="header-left">
        {/* Mobile menu button */}
        <button className="mobile-menu-btn" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
        
        {/* Page title */}
        <h1 className="page-title">{pageTitle}</h1>
      </div>

      <div className="header-right">
        {/* Search bar */}
        <div className="search-container">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Notifications */}
        <div className="notification-container">
          <button 
            className="notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="notification-badge">{unreadCount}</span>
            )}
          </button>

          {/* Notifications dropdown */}
          {showNotifications && (
            <div className="notifications-dropdown">
              <div className="notifications-header">
                <h3>Notifications</h3>
                <span className="notification-count">{notifications.length}</span>
              </div>
              <div className="notifications-list">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${notification.unread ? 'unread' : ''}`}
                  >
                    <div className="notification-message">{notification.message}</div>
                    <div className="notification-time">{notification.time}</div>
                  </div>
                ))}
              </div>
              <div className="notifications-footer">
                <button className="view-all-btn">View all</button>
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="user-menu-container">
          <button 
            className="user-menu-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="user-avatar">JD</div>
            <div className="user-info">
              <span className="user-name">John Doe</span>
              <span className="user-role">Admin</span>
            </div>
            <ChevronDown size={16} />
          </button>

          {/* User dropdown */}
          {showUserMenu && (
            <div className="user-dropdown">
              <div className="user-dropdown-header">
                <div className="user-avatar-large">JD</div>
                <div>
                  <div className="dropdown-user-name">John Doe</div>
                  <div className="dropdown-user-email">john@example.com</div>
                </div>
              </div>
              <div className="user-dropdown-menu">
                <button className="dropdown-item">
                  <User size={16} />
                  <span>Profile</span>
                </button>
                <button className="dropdown-item">
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <hr className="dropdown-divider" />
                <button className="dropdown-item logout">
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showNotifications || showUserMenu) && (
        <div 
          className="dropdown-overlay" 
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;