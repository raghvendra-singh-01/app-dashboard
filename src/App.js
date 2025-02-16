import React from 'react';
import './index.css';
import './Dashboard/Pages.css';
import './Dashboard/Layout.css';
import './Dashboard/Dashboard.css';
import './App.css';
import AuthForm from './AuthForm';
import SuccessPage from './Success';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Dashboard/Layout';
import Dashboard from './Dashboard/Dashboard';
import {
  EmailPage,
  CalendarPage,
  DocumentsPage,
  AnalyticsPage,
  TeamPage,
  SettingsPage,
} from './Dashboard/Pages';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/email"
            element={
              <Layout>
                <EmailPage />
              </Layout>
            }
          />
          <Route
            path="/calendar"
            element={
              <Layout>
                <CalendarPage />
              </Layout>
            }
          />
          <Route
            path="/documents"
            element={
              <Layout>
                <DocumentsPage />
              </Layout>
            }
          />
          <Route
            path="/analytics"
            element={
              <Layout>
                <AnalyticsPage />
              </Layout>
            }
          />
          <Route
            path="/team"
            element={
              <Layout>
                <TeamPage />
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout>
                <SettingsPage />
              </Layout>
            }
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;