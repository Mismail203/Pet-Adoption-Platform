import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  LogOut,
  ClipboardCheck,
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const menuItems = [
    {
      id: "dashboard",
      icon: Home,
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    { id: "users", icon: Users, label: "Users", path: "/admin/users" },
    { id: "pets", icon: PawPrint, label: "Pets", path: "/admin/pets" },
    {
      id: "adoptions",
      icon: ClipboardCheck,
      label: "Adoptions",
      path: "/admin/adoptions",
    },
    {
      id: "returns",
      icon: ClipboardCheck,
      label: "Returns",
      path: "/admin/returns",
    },
    {
      id: "treatments",
      icon: Syringe,
      label: "Treatments",
      path: "/admin/treatments",
    },
    {
      id: "settings",
      icon: Settings,
      label: "Settings",
      path: "/admin/settings",
    },
    { id: "logout", icon: LogOut, label: "Logout", path: "/admin/logout" },
  ];

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}

      <div className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">
              <PawPrint size={24} />
            </div>
            <span className="logo-text">PetAdopt Admin</span>
          </div>
          <button className="close-btn" onClick={toggleSidebar}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`nav-item ${isActive ? "active" : ""}`}
                onClick={toggleSidebar}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            {userData?.image ? (
              <img src={userData.image} alt="User" className="user-avatar" />
            ) : (
              <div className="user-avatar">
                {getInitials(userData?.name || "")}
              </div>
            )}
            <div className="user-info">
              <div className="user-name">{userData?.name || "Admin"}</div>
              <div className="user-role">Administrator</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
