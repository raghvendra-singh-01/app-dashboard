import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Settings, Users, Bell, ChevronDown, User } from "lucide-react";
import "./Layout.css";

function Layout({ children }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      try {
        setLoading(true);
        if (user) {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserData({ uid: user.uid, ...userDoc.data() });
          } else {
            setUserData(null);
          }
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getWelcomeMessage = () => {
    if (loading) return "Welcome back!";
    if (userData?.name) return `Welcome back, ${userData.name}`;
    if (userData?.email) return `Welcome back, ${userData.email.split('@')[0]}`;
    return "Welcome back!";
  };

  const getProfileDisplay = () => {
    if (loading) return "Loading...";
    if (userData?.name) return userData.name;
    if (userData?.email) return userData.email;
    return "Guest";
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
        <br />
        <hr />
        <br />
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
          <Link
            to="/profile"
            className={`sidebar-link ${location.pathname === "/profile" ? "active" : ""}`}
          >
            <User className="sidebar-link-icon" />
            Profile
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-title">
            {getWelcomeMessage()}
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
                  src={userData?.photoURL || "https://www.gravatar.com/avatar/?d=mp"}
                  alt="Profile"
                  className="profile-image"
                />
                <span>{getProfileDisplay()}</span>
                <ChevronDown className="profile-icon" />
              </button>
              {isProfileOpen && (
                <div className="profile-dropdown">
                  <div className="profile-info">
                    <h4>{userData?.name || 'User'}</h4>
                    <p>{userData?.email}</p>
                    {userData?.phone && <p>📱 {userData.phone}</p>}
                    {userData?.birthDate && (
                      <p>🎂 {new Date(userData.birthDate.seconds * 1000).toLocaleDateString()}</p>
                    )}
                    {userData?.address && <p>🏠 {userData.address}</p>}
                  </div>
                  <Link to="/profile"> Profile | </Link>
                  <Link to="/settings">Settings</Link>
                  <button onClick={handleSignOut}>Sign out</button>
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