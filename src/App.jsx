import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { ApiProvider } from './context/ApiContext';
import { Layout } from './components/layout/Layout';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Anonymization } from './pages/Anonymization';
import { RiskAnalyzer } from './pages/RiskAnalyzer';
import { DatasetAccess } from './pages/DatasetAccess';
import { ProofPage } from './pages/ProofPage';
import { HackerAI } from './pages/HackerAI';
import { LoginActivity } from './pages/LoginActivity';
import { Settings } from './pages/Settings';
import { UserProfile } from './pages/UserProfile';

import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ApiProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />

              <Route path="/" element={<Layout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="anonymization" element={<Anonymization />} />
                <Route path="risk-analyzer" element={<RiskAnalyzer />} />
                <Route path="dataset-access" element={<DatasetAccess />} />
                <Route path="proof" element={<ProofPage />} />
                <Route path="hacker-ai" element={<HackerAI />} />
                <Route path="login-activity" element={<LoginActivity />} />
                <Route path="settings" element={<Settings />} />
                <Route path="profile" element={<UserProfile />} />
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ApiProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
