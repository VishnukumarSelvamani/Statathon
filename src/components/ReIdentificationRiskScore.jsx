import React from 'react';
import { Card } from './ui/Card';
import './ReIdentificationRiskScore.css';

import { useApi } from '../context/ApiContext';

export const ReIdentificationRiskScore = () => {
    const { riskMetrics, dpOutput, isLoading } = useApi();

    if (isLoading) return <div className="p-4 text-center">Loading Risk Score...</div>;
    if (!riskMetrics) return <div className="p-4 text-center text-muted">No Risk Data Available</div>;

    const { score, level, riskBreakdown } = riskMetrics;
    const { high, medium, low } = riskBreakdown || { high: 0, medium: 0, low: 0 }; // Backend might send simplified or detailed.
    // Actually backend sends quasiIdentifier etc. Let's map it or use score to distribute if breakdown missing.
    // If backend doesn't send specific bars, we can visualize the score component-wise or just show score.
    // Let's assume standard breakdown or mapped for now.
    // "Risk Indicator Bars" usually map to risk components.

    // Fallback mapping if specific breakdown keys missing
    const breakdown = riskMetrics.summary || { highRisk: 0, mediumRisk: 0, lowRisk: 0 };
    // Normalizing for bars (just for visualization ratio)
    const total = (breakdown.highRisk + breakdown.mediumRisk + breakdown.lowRisk) || 1;

    return (
        <Card title="Re-Identification Risk Score" className="re-id-risk-card">
            <div className="risk-score-panel">
                <div className="risk-score-left">
                    <div className="risk-bars">
                        <div className="risk-bar-item">
                            <span className="bar-label">High</span>
                            <div className="bar-container">
                                <div className="bar-fill high" style={{ width: `${(breakdown.highRisk / total) * 100}%` }}></div>
                            </div>
                        </div>
                        <div className="risk-bar-item">
                            <span className="bar-label">Medium</span>
                            <div className="bar-container">
                                <div className="bar-fill medium" style={{ width: `${(breakdown.mediumRisk / total) * 100}%` }}></div>
                            </div>
                        </div>
                        <div className="risk-bar-item">
                            <span className="bar-label">Low</span>
                            <div className="bar-container">
                                <div className="bar-fill low" style={{ width: `${(breakdown.lowRisk / total) * 100}%` }}></div>
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
                                    stroke={score > 70 ? "#c5221f" : score > 30 ? "#ed6c02" : "#2e7d32"}
                                    strokeWidth="20"
                                    strokeDasharray="251.2"
                                    strokeDashoffset={251.2 - (251.2 * (score / 100))}
                                />
                            </svg>
                            <div className="gauge-value">
                                <div className="gauge-number">{score}</div>
                                <div className="gauge-label">{level || (score > 70 ? 'High Risk' : 'Safe')}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="risk-score-right">
                    <div className="dp-mini-info">
                        <div className="dp-mini-item">
                            <span className="dp-mini-label">DP Total Files</span>
                            <span className="dp-mini-value">{dpOutput?.totalRecords || 0}</span>
                        </div>
                        <div className="dp-mini-item">
                            <span className="dp-mini-label">Noise Level</span>
                            <span className="dp-mini-value">{dpOutput?.noiseAdded ? 'Active' : 'Standard'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ReIdentificationRiskScore;
