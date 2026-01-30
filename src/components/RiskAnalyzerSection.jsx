import React from 'react';
import { Card } from './ui/Card';
import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import './RiskAnalyzerSection.css';

export const RiskAnalyzerSection = () => {
    return (
        <div className="dashboard-card risk-analyzer-section">
            <div className="section-header-blue">
                <h2>Data Preview & Risk Analysis</h2>
            </div>

            <div className="data-preview-grid">
                {/* Left Column - Data Table + Risk Score */}
                <div className="data-table-column">
                    <Card>
                        <div className="table-wrapper">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>SL No.</th>
                                        <th>State Name</th>
                                        <th>District</th>
                                        <th>Activity</th>
                                        <th>Privacy Risk Level</th>
                                        <th>DP Hired Male Worker</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Maharashtra</td>
                                        <td>Mumbai</td>
                                        <td>Manufacturing</td>
                                        <td><span className="risk-badge high">High</span></td>
                                        <td>145</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Karnataka</td>
                                        <td>Bangalore</td>
                                        <td>IT Services</td>
                                        <td><span className="risk-badge medium">Medium</span></td>
                                        <td>89</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Tamil Nadu</td>
                                        <td>Chennai</td>
                                        <td>Construction</td>
                                        <td><span className="risk-badge low">Low</span></td>
                                        <td>67</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>Gujarat</td>
                                        <td>Ahmedabad</td>
                                        <td>Retail Trade</td>
                                        <td><span className="risk-badge high">High</span></td>
                                        <td>123</td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>West Bengal</td>
                                        <td>Kolkata</td>
                                        <td>Education</td>
                                        <td><span className="risk-badge medium">Medium</span></td>
                                        <td>54</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Card>

                </div>

                {/* Right Column - Differential Privacy Output */}
                <div className="dp-output-column">
                    <Card title="Differential Privacy Output">
                        <div className="dp-output-content">
                            <div className="dp-param-row">
                                <span className="dp-param-label">Privacy Budget (Epsilon):</span>
                                <span className="dp-param-value">0.7</span>
                            </div>
                            <div className="dp-param-row">
                                <span className="dp-param-label">Noise Distribution:</span>
                                <span className="dp-param-value">Laplace Noise</span>
                            </div>
                            <div className="dp-param-row">
                                <span className="dp-param-label">Noise Added:</span>
                                <span className="dp-param-value">±1 to ±2</span>
                            </div>

                            <button className="export-btn">
                                Export Report
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default RiskAnalyzerSection;
