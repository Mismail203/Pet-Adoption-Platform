import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  X,
  PawPrint,
  Syringe,
  LogOut,
  DollarSign,
  ChevronDown,
  ClipboardCheck,
  ChevronRight,
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

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
      id: "payments",
      icon: DollarSign,
      label: "Payments",
      children: [
        { id: "paid", label: "Paid Payments", path: "/admin/payments/paid" },
        {
          id: "pending",
          label: "Pending Payments",
          path: "/admin/payments/pending",
        },
        {
          id: "rejected",
          label: "Rejected Payments",
          path: "/admin/payments/rejected",
        },
      ],
    },
    {
      id: "settings",
      icon: Settings,
      label: "Settings",
      path: "/admin/settings",
    },
    { id: "logout", icon: LogOut, label: "Logout", path: "/admin/logout" },
  ];

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
            const hasChildren = !!item.children;

            if (!hasChildren) {
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
            }

            // parent with children
            return (
              <div key={item.id} className="nav-group">
                <div
                  className={`nav-item ${openMenu === item.id ? "open" : ""}`}
                  onClick={() =>
                    setOpenMenu(openMenu === item.id ? null : item.id)
                  }
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                  {openMenu === item.id ? (
                    <ChevronDown size={16} className="chevron" />
                  ) : (
                    <ChevronRight size={16} className="chevron" />
                  )}
                </div>
                {openMenu === item.id && (
                  <div className="submenu">
                    {item.children.map((child) => {
                      const activeChild = location.pathname === child.path;
                      return (
                        <Link
                          key={child.id}
                          to={child.path}
                          className={`submenu-item ${
                            activeChild ? "active" : ""
                          }`}
                          onClick={toggleSidebar}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
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
