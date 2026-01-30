import React from 'react';
import { CloudUpload, Shield, AlertCircle, CheckCircle2, FileText, Activity, Calendar, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

export const Dashboard = () => {
    const activityData = [
        { name: 'Jan', value: 400 },
        { name: 'Feb', value: 300 },
        { name: 'Mar', value: 600 },
        { name: 'Apr', value: 800 },
        { name: 'May', value: 500 },
        { name: 'Jun', value: 900 },
        { name: 'Jul', value: 1284 }
    ];

    return (
        <div className="dashboard-content animate-fade-in">
            <div className="dashboard-scroll-area-inner">
                {/* Section 1: Stat Cards */}
                <div className="summary-grid">
                    <div className="stat-card hover-lift">
                        <div className="stat-icon-wrap blue">
                            <CloudUpload size={24} />
                        </div>
                        <div className="stat-details">
                            <span className="stat-label">TOTAL FILES UPLOADED</span>
                            <span className="stat-value">1,284</span>
                        </div>
                    </div>

                    <div className="stat-card hover-lift">
                        <div className="stat-icon-wrap yellow">
                            <Shield size={24} />
                        </div>
                        <div className="stat-details">
                            <span className="stat-label">PRIVACY AUDIT STATUS</span>
                            <div className="stat-value-wrap">
                                <span className="stat-value">12</span>
                                <span className="status-indicator yellow">Pending</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card hover-lift">
                        <div className="stat-icon-wrap red">
                            <AlertCircle size={24} />
                        </div>
                        <div className="stat-details">
                            <span className="stat-label">HIGH RISK FILES</span>
                            <div className="stat-value-wrap">
                                <span className="stat-value">4</span>
                                <span className="status-indicator red">Critical</span>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card hover-lift">
                        <div className="stat-icon-wrap green">
                            <CheckCircle2 size={24} />
                        </div>
                        <div className="stat-details">
                            <span className="stat-label">APPROVED FILES</span>
                            <div className="stat-value-wrap">
                                <span className="stat-value">892</span>
                                <span className="status-indicator green">Safe</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 2: Main Grid with Activity Chart */}
                <div className="dashboard-main-grid">
                    <div className="data-card main-table-card shadow-sm">
                        <div className="card-header">
                            <h3>File Processing Activity</h3>
                        </div>
                        <div className="card-body">
                            <div className="chart-container-large">
                                <ResponsiveContainer width="100%" height={250}>
                                    <AreaChart data={activityData}>
                                        <defs>
                                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#1a73e8" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#1a73e8" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                        <YAxis hide />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        />
                                        <Area type="monotone" dataKey="value" stroke="#1a73e8" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="quick-table-wrap mt-lg">
                                <table className="flat-table">
                                    <thead>
                                        <tr>
                                            <th>FILE NAME</th>
                                            <th>LAST RECORDED</th>
                                            <th>STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="text-bold">PLFS_Annual_2024.csv</td>
                                            <td>2024-01-15</td>
                                            <td><span className="badge-status green">COMPLETED</span></td>
                                        </tr>
                                        <tr>
                                            <td className="text-bold">ASI_2023_Final.csv</td>
                                            <td>2024-01-20</td>
                                            <td><span className="badge-status yellow">IN PROGRESS</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="data-card side-details-card shadow-sm">
                        <div className="card-header">
                            <h3>Analytics Summary</h3>
                        </div>
                        <div className="card-body">
                            <div className="list-detail-item">
                                <div className="list-icon-bg"><TrendingUp size={20} className="blue-icon" /></div>
                                <div className="list-info">
                                    <span className="list-label">Growth (MoM)</span>
                                    <span className="list-value">+12.4%</span>
                                </div>
                            </div>
                            <div className="list-detail-item">
                                <div className="list-icon-bg"><Activity size={20} className="orange-icon" /></div>
                                <div className="list-info">
                                    <span className="list-label">Avg. Privacy Score</span>
                                    <span className="list-value">84/100</span>
                                </div>
                            </div>
                            <div className="list-detail-item">
                                <div className="list-icon-bg"><Calendar size={20} className="green-icon" /></div>
                                <div className="list-info">
                                    <span className="list-label">Next System Audit</span>
                                    <span className="list-value">Feb 01, 2026</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
