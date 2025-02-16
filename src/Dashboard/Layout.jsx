// src/Dashboard/Layout.jsx
import React, { useState, useEffect } from "react";
import {auth }  from "../firebase";
import { signOut } from "firebase/auth";  
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  Users,
  Bell,
  ChevronDown,
} from "lucide-react";
import "./Layout.css";

function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
    });
    return () => unsubscribe();
}, []);

// Sign out Handler 

const handleSignOut = async () => {
  try {
      await signOut(auth);
      navigate('/');
  } catch (error) {
      console.error('Error signing out:', error);
  }
};


  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <Link to="/" className="sidebar-title">
            <LayoutDashboard className="sidebar-link-icon" />
            Dashboard
          </Link>
        </div>
        <br />  <br />
        <nav className="sidebar-nav">
          <Link
            to="/dashboard"
            className={`sidebar-link ${location.pathname === "/dashboard" ? "active" : ""}`}
          >
            <LayoutDashboard className="sidebar-link-icon" />
            Dashboard
          </Link>
          <Link
            to="/team"
            className={`sidebar-link ${location.pathname === "/team" ? "active" : ""}`}
          >
            <Users className="sidebar-link-icon" />
            Team
          </Link>
          <Link
            to="/settings"
            className={`sidebar-link ${location.pathname === "/settings" ? "active" : ""}`}
          >
            <Settings className="sidebar-link-icon" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content" style={{ maxWidth: "1200px" }}>
        {/* Header */}
        <header className="header">
          <div className="header-title">Welcome back,
             {user ? user.email : 'User'}
          </div>
          <div className="header-actions">
            <button className="icon-button">
              <Bell className="sidebar-link-icon" />
            </button>
            <div className="profile-container">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="profile-button"
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="profile-image"
                  style={{ width: "40px", height: "40px" }}
                />
                <span>{user ? user.email : 'Guest'}</span>
                <ChevronDown className="profile-icon" />
              </button>
              {isProfileOpen && (
                <div className="profile-dropdown">
                  <a href="#">Your Profile</a>
                  <a href="#">Settings</a>
                  <a href="#" onClick={handleSignOut}>Sign out</a>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="content-wrapper">
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;
