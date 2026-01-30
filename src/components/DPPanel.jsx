import React from 'react';
import { Shield, Database, Activity } from 'lucide-react';
import './DPPanel.css';

export const DPPanel = () => {
    return (
        <div className="dp-output-panel">
            <h3 className="panel-title">Differential Privacy Output</h3>
            <div className="panel-content">
                <div className="dp-item">
                    <Shield size={16} className="dp-icon orange" />
                    <span className="dp-label">Privacy Budget (Epsilon):</span>
                    <span className="dp-value">0.7</span>
                </div>
                <div className="dp-item">
                    <Database size={16} className="dp-icon blue" />
                    <span className="dp-label">Noise Distribution:</span>
                    <span className="dp-value blue-text">Laplace Noise</span>
                </div>
                <div className="dp-item">
                    <Activity size={16} className="dp-icon orange" />
                    <span className="dp-label">Noise Added:</span>
                    <span className="dp-value">±1 to ±2</span>
                </div>

                <button className="export-report-btn">
                    Export Report
                </button>
            </div>
        </div>
    );
};

export default DPPanel;
