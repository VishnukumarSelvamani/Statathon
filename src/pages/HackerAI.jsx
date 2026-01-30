import { Bug, Terminal, Activity, Cpu } from 'lucide-react';
import './Dashboard.css'; // Reusing dashboard grid styles

export const HackerAI = () => {
    return (
        <div className="dashboard-content">
            <div className="dashboard-scroll-area-inner">
                {/* Section 1: Summary Grid */}
                <div className="summary-grid">
                    <div className="stat-card">
                        <div className="stat-icon-wrap red">
                            <Bug size={24} />
                        </div>
                        <div className="stat-details">
                            <span className="stat-label">VULNERABILITIES FOUND</span>
                            <span className="stat-value">2 Primary</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon-wrap blue">
                            <Terminal size={24} />
                        </div>
                        <div className="stat-details">
                            <span className="stat-label">ATTACK VECTORS</span>
                            <span className="stat-value">Linkage, Skew</span>
                        </div>
                    </div>
                </div>

                <div className="dashboard-main-grid">
                    <div className="data-card main-table-card">
                        <div className="card-header">
                            <h3>AI-Powered Privacy Attack Simulation</h3>
                        </div>
                        <div className="card-body">
                            <div className="hacker-content-placeholder">
                                <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '24px' }}>
                                    This module simulates adversarial re-identification attacks using machine learning
                                    to test the robustness of anonymization techniques applied to NSS datasets.
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>Simulation Status:</span>
                                    <span className="badge-status yellow">READY FOR ATTACK</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="data-card side-details-card">
                        <div className="card-header">
                            <h3>Simulator Config</h3>
                        </div>
                        <div className="card-body">
                            <div className="list-detail-item">
                                <div className="list-icon"><Cpu size={20} /></div>
                                <div className="list-info">
                                    <span className="list-label">Compute Core</span>
                                    <span className="list-value">Nvidia CUDA (v12)</span>
                                </div>
                            </div>
                            <div className="list-detail-item">
                                <div className="list-icon"><Activity size={20} /></div>
                                <div className="list-info">
                                    <span className="list-label">Model Accuracy</span>
                                    <span className="list-value">94.2% Success</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HackerAI;
