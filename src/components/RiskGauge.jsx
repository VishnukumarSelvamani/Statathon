import React from 'react';
import { Card } from './ui/Card';
import { Activity, Shield } from 'lucide-react';
import './RiskGauge.css';

export const RiskGauge = () => {
    return (
        <div className="risk-gauge-container">
            <div className="re-id-risk-section">
                <h3 className="sub-section-title">Re-Identification Risk Score</h3>
                <div className="gauge-flex-layout">
                    <div className="gauge-graphic-stats">
                        <div className="stats-bars">
                            <div className="stat-bar bar-1"></div>
                            <div className="stat-bar bar-2"></div>
                            <div className="stat-bar bar-3"></div>
                            <div className="stat-bar bar-4"></div>
                        </div>
                        <div className="gauge-arc-wrapper">
                            <svg viewBox="0 0 200 120" className="gauge-svg-arc">
                                <path
                                    d="M 20 100 A 80 80 0 0 1 180 100"
                                    fill="none"
                                    stroke="#e0e0e0"
                                    strokeWidth="20"
                                />
                                <path
                                    d="M 20 100 A 80 80 0 0 1 180 100"
                                    fill="none"
                                    stroke="url(#gauge-gradient)"
                                    strokeWidth="20"
                                    strokeDasharray="251.2"
                                    strokeDashoffset="50"
                                />
                                <defs>
                                    <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#137333" />
                                        <stop offset="50%" stopColor="#f29900" />
                                        <stop offset="100%" stopColor="#c5221f" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="gauge-info-overlay">
                                <span className="gauge-number">82</span>
                                <span className="gauge-label-text">High Risk</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="divider-vertical"></div>

            <div className="dp-mini-output-section">
                <h3 className="sub-section-title">Differential Privacy Output</h3>
                <div className="dp-mini-content">
                    <div className="dp-mini-row">
                        <Shield size={16} className="mini-icon blue" />
                        <span className="mini-label">DP Total Workers:</span>
                        <span className="mini-value red-text">198 (±3)</span>
                    </div>
                    <div className="dp-mini-row">
                        <div className="mini-icon-box">
                            <span>⬡</span>
                        </div>
                        <span className="mini-label">Noise Level:</span>
                        <span className="mini-value blue-text">Low Noise</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiskGauge;
