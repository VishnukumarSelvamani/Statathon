import React from 'react';
import { CloudUpload, Shield, AlertCircle, CheckCircle2, Activity, Calendar, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useApi } from '../context/ApiContext';

import './Dashboard.css';

export const Dashboard = () => {
    const { riskMetrics, datasets, selectedDataset, selectDataset, isLoading, activityData } = useApi();

    // REMOVED BLOCKING LOADER. Structure will render with Safe Defaults below.

    // -- DYNAMIC AGGREGATION FROM API DATA --
    const stats = React.useMemo(() => {
        const total = datasets.length;
        const pending = datasets.filter(d => d.status === 'Pending Review' || d.status === 'In Progress').length;
        const highRisk = datasets.filter(d => (d.riskScore || 0) > 75).length;
        const approved = datasets.filter(d => d.status === 'Active' || d.status === 'Analysis Ready').length;

        // Growth calc: Compare current month uploads vs previous month
        const currentMonth = new Date().getMonth();
        const thisMonthCount = datasets.filter(d => {
            const date = new Date(d.lastModified || d.uploadDate || Date.now());
            return date.getMonth() === currentMonth;
        }).length;

        const growth = total > 0 ? ((thisMonthCount / total) * 100).toFixed(1) : "0.0";

        return { totalFiles: total, pending, highRisk, approved, growth };
    }, [datasets]);

    const activeTableData = React.useMemo(() => {
        return datasets.slice(0, 5).map(ds => ({
            name: ds.name,
            lastModified: ds.lastModified || new Date().toISOString().split('T')[0],
            status: ds.status || 'Pending'
        }));
    }, [datasets]);

    // Fallback: If context hasn't loaded data yet, use empty array or wait
    // But activityData will default to [] initially.
    // We want to use it if available.

    // Compute chart data: Prioritize activityData from context
    const chartData = React.useMemo(() => {
        if (activityData && activityData.length > 0) {
            return activityData;
        }

        // Fallback (Tertiary): If API fails and mock fallback fails (unlikely), 
        // keep the old logic or just empty. 
        // But since api.js forces a mock fallback, activityData should strictly be populated.
        // We'll keep a minimal fallback just in case to prevent crash.
        return [];
    }, [activityData]);

    // Ensure we have a dataset selected for the rest of the app context
    React.useEffect(() => {
        if (!selectedDataset && datasets.length > 0) {
            selectDataset(datasets[0]);
        }
    }, [selectedDataset, datasets, selectDataset]);

    return (
        <div className="dashboard-content animate-fade-in">
            <div className="dashboard-scroll-area-inner">
                {/* Header Strip with Indicator */}


                {/* Section 1: Stat Cards */}
                <div className="summary-grid">
                    <div className="stat-card hover-lift">
                        <div className="stat-icon-wrap blue">
                            <CloudUpload size={24} />
                        </div>
                        <div className="stat-details">
                            <span className="stat-label">TOTAL FILES UPLOADED</span>
                            <span className="stat-value">{stats.totalFiles.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="stat-card hover-lift">
                        <div className="stat-icon-wrap yellow">
                            <Shield size={24} />
                        </div>
                        <div className="stat-details">
                            <span className="stat-label">PRIVACY AUDIT STATUS</span>
                            <div className="stat-value-wrap">
                                <span className="stat-value">{stats.pending}</span>
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
                                <span className="stat-value">{stats.highRisk}</span>
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
                                <span className="stat-value">{stats.approved}</span>
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
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#1a73e8" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#1a73e8" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} interval={0} />
                                        <YAxis hide />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                            formatter={(value) => [`${value} Files`, 'Processed']}
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
                                        {activeTableData.map((file, idx) => (
                                            <tr key={idx}>
                                                <td className="text-bold">{file.name}</td>
                                                <td>{file.lastModified}</td>
                                                <td>
                                                    <span className={`badge-status ${file.status === 'Active' || file.status === 'Analysis Ready' ? 'green' : 'yellow'}`}>
                                                        {file.status.toUpperCase()}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
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
                                    <span className="list-value">+{stats.growth}%</span>
                                </div>
                            </div>
                            <div className="list-detail-item">
                                <div className="list-icon-bg"><Activity size={20} className="orange-icon" /></div>
                                <div className="list-info">
                                    <span className="list-label">Avg. Privacy Score</span>
                                    <span className="list-value">
                                        {((datasets.reduce((acc, d) => acc + (d.riskScore || 0), 0) / (datasets.length || 1)).toFixed(0))}/100
                                    </span>
                                </div>
                            </div>
                            <div className="list-detail-item">
                                <div className="list-icon-bg"><Calendar size={20} className="green-icon" /></div>
                                <div className="list-info">
                                    <span className="list-label">Latest Activity</span>
                                    <span className="list-value">
                                        {datasets.length > 0
                                            ? new Date(Math.max(...datasets.map(d => new Date(d.lastModified || Date.now())))).toLocaleDateString()
                                            : 'No Data'}
                                    </span>
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
