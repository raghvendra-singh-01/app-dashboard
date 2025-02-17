// src/Dashboard/Pages.jsx
import React from "react";
import "./Pages.css";

export function EmailPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Email Client</h1>
      <div className="page-content">
        <p className="page-text">
          Your email management dashboard will be displayed here.
        </p>
      </div>
    </div>
  );
}

export function CalendarPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Calendar</h1>
      <div className="page-content">
        <p className="page-text">
          Your calendar and appointments will be displayed here.
        </p>
      </div>
    </div>
  );
}

export function DocumentsPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Documents</h1>
      <div className="page-content">
        <p className="page-text">
          Your documents and files will be displayed here.
        </p>
      </div>
    </div>
  );
}

export function AnalyticsPage() {
  return (
    <div class="page-container">
      <h1 className="page-title">Analytics</h1>
      <div className="page-content">
        <p className="page-text">
          Your analytics and reports will be displayed here.
        </p>
      </div>
    </div>
  );
}

export function TeamPage() {
  return (
    <div className="page-container">
      <h1 class="page-title">Team Management</h1>
      <div className="page-content">
        <p className="page-text">
          Team management dashboard will be displayed here.
        </p>
      </div>
    </div>
  );
}

export function SettingsPage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Settings</h1>
      <div className="page-content">
        <p className="page-text">
          Application settings will be displayed here.
        </p>
      </div>
    </div>
  );
}

export function ProfilePage() {
  return (
    <div className="page-container">
      <h1 className="page-title">Profile</h1>
      <div className="page-content">
        <p className="page-text">
          Your profile information will be displayed here.
        </p>
      </div>
    </div>
  );
}
