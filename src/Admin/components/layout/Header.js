import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  ChevronDown,
  Settings as SettingsIcon, // renamed to avoid conflict
  User,
  LogOut
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ toggleSidebar, pageTitle = "Dashboard", onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [userData, setUserData] = useState(null);

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const notifications = [
    { id: 1, message: "New user registered", time: "2 mins ago", unread: true },
    { id: 2, message: "Order #1234 completed", time: "5 mins ago", unread: true },
    { id: 3, message: "Server backup completed", time: "1 hour ago", unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = () => {
    if (typeof onLogout === 'function') {
      onLogout();
    }
  };

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="page-title">{pageTitle}</h1>
      </div>

      <div className="header-right">
      <div className="search-container hidden md:flex">
  <Search className="search-icon" size={18} />
  <input
    type="text"
    placeholder="Search..."
    value={searchValue}
    onChange={(e) => setSearchValue(e.target.value)}
    className="search-input"
  />
</div>


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

        <div className="user-menu-container">
          <button 
            className="user-menu-btn"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            {userData?.image ? (
              <img src={userData.image} alt="User" className="user-avatar" />
            ) : (
              <div className="user-avatar">
                {getInitials(userData?.name || '')}
              </div>
            )}
            <div className="user-info">
              <span className="user-name">{userData?.name || 'User'}</span>
            </div>
            <ChevronDown size={16} />
          </button>

          {showUserMenu && (
            <div className="user-dropdown">
              <div className="user-dropdown-header">
                {userData?.image ? (
                  <img src={userData.image} alt="User" className="user-avatar-large" />
                ) : (
                  <div className="user-avatar-large">
                    {getInitials(userData?.name || '')}
                  </div>
                )}
                <div>
                  <div className="dropdown-user-name">{userData?.name || 'User'}</div>
                  <div className="dropdown-user-email">{userData?.email || ''}</div>
                </div>
              </div>
              <div className="user-dropdown-menu">
                <Link to="/admin/settings" className="dropdown-item flex items-center gap-2">
                  <SettingsIcon size={16} />
                  <span>Settings</span>
                </Link>
                <hr className="dropdown-divider" />
                <button className="dropdown-item logout" onClick={handleLogout}>
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

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
