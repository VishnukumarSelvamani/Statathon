import React from 'react';
import { Card } from './ui/Card';
import './ReIdentificationRiskScore.css';

export const ReIdentificationRiskScore = () => {
    return (
        <Card title="Re-Identification Risk Score" className="re-id-risk-card">
            <div className="risk-score-panel">
                <div className="risk-score-left">
                    <div className="risk-bars">
                        <div className="risk-bar-item">
                            <span className="bar-label">High</span>
                            <div className="bar-container">
                                <div className="bar-fill high" style={{ width: '82%' }}></div>
                            </div>
                        </div>
                        <div className="risk-bar-item">
                            <span className="bar-label">Medium</span>
                            <div className="bar-container">
                                <div className="bar-fill medium" style={{ width: '56%' }}></div>
                            </div>
                        </div>
                        <div className="risk-bar-item">
                            <span className="bar-label">Low</span>
                            <div className="bar-container">
                                <div className="bar-fill low" style={{ width: '34%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="risk-score-center">
                    <div className="gauge-container">
                        <div className="gauge-wrapper">
                            <svg viewBox="0 0 200 120" className="gauge-svg">
                                <path
                                    d="M 20 100 A 80 80 0 0 1 180 100"
                                    fill="none"
                                    stroke="#e0e0e0"
                                    strokeWidth="20"
                                />
                                <path
                                    d="M 20 100 A 80 80 0 0 1 180 100"
                                    fill="none"
                                    stroke="#c5221f"
                                    strokeWidth="20"
                                    strokeDasharray="251.2"
                                    strokeDashoffset="50"
                                />
                            </svg>
                            <div className="gauge-value">
                                <div className="gauge-number">82</div>
                                <div className="gauge-label">High Risk</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="risk-score-right">
                    <div className="dp-mini-info">
                        <div className="dp-mini-item">
                            <span className="dp-mini-label">DP Total Files</span>
                            <span className="dp-mini-value">198 (±3)</span>
                        </div>
                        <div className="dp-mini-item">
                            <span className="dp-mini-label">Noise Level</span>
                            <span className="dp-mini-value">Low Noise</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ReIdentificationRiskScore;
