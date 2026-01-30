import React from 'react';
import { ShieldCheck, Lock, FileCheck, Clock } from 'lucide-react';
import './ProofPage.css';

export const ProofPage = () => {
    return (
        <div className="dashboard-content">
            <div className="dashboard-scroll-area-inner">
                {/* Section 1: Stat Cards */}
                <div className="summary-grid">
                    <div className="stat-card">
                        <div className="stat-icon-wrap blue">
                            <ShieldCheck size={24} />
                        </div>
                        <div className="stat-details">
                            <span className="stat-label">TOTAL ANALYZED</span>
                            <span className="stat-value">1,284</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon-wrap red">
                            <ShieldCheck size={24} />
                        </div>
                        <div className="stat-details">
                            <span className="stat-label">HIGH RISK</span>
                            <span className="stat-value">4</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon-wrap yellow">
                            <ShieldCheck size={24} />
                        </div>
                        <div className="stat-details">
                            <span className="stat-label">MEDIUM RISK</span>
                            <span className="stat-value">12</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon-wrap green">
                            <ShieldCheck size={24} />
                        </div>
                        <div className="stat-details">
                            <span className="stat-label">SAFE FILES</span>
                            <span className="stat-value">1,268</span>
                        </div>
                    </div>
                </div>

                {/* Section 2: Logs */}
                <div className="dashboard-main-grid">
                    <div className="data-card main-table-card">
                        <div className="card-header">
                            <h3>Approval & Audit Logs</h3>
                        </div>
                        <div className="card-body">
                            <table className="flat-table">
                                <thead>
                                    <tr>
                                        <th>FILE NAME</th>
                                        <th>RISK LEVEL</th>
                                        <th>STATUS</th>
                                        <th>TIMESTAMP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-bold">PLFS_Annual_2024.csv</td>
                                        <td><span className="badge-status red">HIGH</span></td>
                                        <td><span className="badge-status green">APPROVED</span></td>
                                        <td>2024-01-15 14:32</td>
                                    </tr>
                                    <tr>
                                        <td className="text-bold">ASI_2023_Final.csv</td>
                                        <td><span className="badge-status yellow">MEDIUM</span></td>
                                        <td><span className="badge-status green">APPROVED</span></td>
                                        <td>2024-01-20 09:15</td>
                                    </tr>
                                    <tr>
                                        <td className="text-bold">HCE_Survey_Urban.csv</td>
                                        <td><span className="badge-status red">CRITICAL</span></td>
                                        <td><span className="badge-status red">REJECTED</span></td>
                                        <td>2024-01-22 16:45</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="data-card side-details-card">
                        <div className="card-header">
                            <h3>DP Parameters (Global)</h3>
                        </div>
                        <div className="card-body">
                            <div className="list-detail-item">
                                <div className="list-icon"><Lock size={20} /></div>
                                <div className="list-info">
                                    <span className="list-label">Privacy Budget (ε)</span>
                                    <span className="list-value">0.5</span>
                                </div>
                            </div>
                            <div className="list-detail-item">
                                <div className="list-icon"><FileCheck size={20} /></div>
                                <div className="list-info">
                                    <span className="list-label">Noise Mechanism</span>
                                    <span className="list-value">Laplace</span>
                                </div>
                            </div>
                            <div className="list-detail-item">
                                <div className="list-icon"><Clock size={20} /></div>
                                <div className="list-info">
                                    <span className="list-label">Last Audit</span>
                                    <span className="list-value">Today, 15:00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProofPage;
