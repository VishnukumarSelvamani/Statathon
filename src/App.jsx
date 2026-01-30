import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Anonymization } from './pages/Anonymization';
import { RiskAnalyzer } from './pages/RiskAnalyzer';
import { DatasetAccess } from './pages/DatasetAccess';
import { ProofPage } from './pages/ProofPage';
import { HackerAI } from './pages/HackerAI';

function App() {
  return (
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
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
