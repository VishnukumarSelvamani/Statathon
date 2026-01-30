import React from 'react';
import {
    ShieldAlert,
    ShieldCheck,
    PlusSquare,
    Activity,
    CheckCircle2,
    Zap,
    Database,
    ChevronDown
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts';
import './Anonymization.css';
import './RiskAnalyzer.css';

export const RiskAnalyzer = () => {
    const pieData = [
        { name: 'High Risk', value: 24, color: '#d32f2f' },
        { name: 'Medium Risk', value: 46, color: '#ed6c02' },
        { name: 'Low Risk', value: 30, color: '#2e7d32' }
    ];

    const barData = [
        { name: 'A', value: 40, color: '#ed6c02' },
        { name: 'B', value: 60, color: '#004d99' },
        { name: 'C', value: 30, color: '#2e7d32' },
        { name: 'D', value: 50, color: '#d32f2f' }
    ];

    const tableData = [
        { sl: 1, file: 'NSS_Dataset_01.csv', risk: 'High', approval: 'Reject' },
        { sl: 2, file: 'NSS_Dataset_02.csv', risk: 'Medium', approval: 'Accept' },
        { sl: 3, file: 'NSS_Dataset_03.csv', risk: 'Low', approval: 'Accept' }
    ];

    return (
        <div className="analyzer-page-content">
            {/* Header Strip */}
            <div className="header-strip">
                <div className="strip-card clickable">
                    <span className="strip-label">Dataset Uploaded:</span>
                    <span className="strip-value blue-text">NSS_Household_Sample_Data.xlsx</span>
                    <ChevronDown size={14} className="strip-icon" />
                </div>
                <div className="strip-card">
                    <span className="strip-label">Total Records:</span>
                    <span className="strip-value">500</span>
                </div>
                <div className="strip-card">
                    <span className="strip-label">Privacy Audit Status:</span>
                    <span className="strip-value orange-text">In Progress</span>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="analyzer-main-grid">

                {/* Section 2: Data Preview & Risk Analysis */}
                <div className="analyzer-bottom-grid">
                    <div className="analyzer-section-box table-section shadow-sm">
                        <div className="box-header">
                            <span>Data Preview & Risk Analysis</span>
                            <div className="header-dots"><span></span><span></span></div>
                        </div>
                        <div className="box-content no-padding">
                            <table className="analyzer-table">
                                <thead>
                                    <tr>
                                        <th>SL No.</th>
                                        <th>File Name</th>
                                        <th>Risk Level</th>
                                        <th>Status</th>
                                        <th>DP Total Records</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((row) => (
                                        <tr key={row.sl}>
                                            <td>{row.sl}</td>
                                            <td>{row.file}</td>
                                            <td><span className={`risk-badge ${row.risk.toLowerCase()}`}>{row.risk}</span></td>
                                            <td><span className={`approval-text ${row.approval.toLowerCase()}`}>{row.approval}</span></td>
                                            <td>1,540</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="analyzer-section-box output-section shadow-sm">
                        <div className="box-header">Differential Privacy Output</div>
                        <div className="box-content">
                            <div className="output-item-row">
                                <CheckCircle2 size={16} className="color-orange" />
                                <span>Privacy Budget (Epsilon):</span>
                                <strong className="ml-auto">0.7</strong>
                            </div>
                            <div className="output-item-row">
                                <PlusSquare size={16} className="color-blue" />
                                <span>Noise Distribution:</span>
                                <span className="ml-auto blue-link-text">Laplace Noise</span>
                            </div>
                            <div className="output-item-row">
                                <Activity size={16} className="color-orange" />
                                <span>Noise Added:</span>
                                <strong className="ml-auto">±1 to ±2</strong>
                            </div>
                            <button className="gov-btn-primary mt-lg" style={{ width: '100%' }}>Export Report</button>
                        </div>
                    </div>
                </div>

                {/* Section 3: Re-Identification Risk Score */}
                <div className="bottom-row-panels">
                    <div className="bottom-panel risk-score-panel shadow-sm">
                        <h3>Re-Identification Risk Score</h3>
                        <div className="risk-analysis-visual">
                            <div className="arc-meter-container">
                                <div className="large-arc-meter">
                                    <svg viewBox="0 0 100 50">
                                        <path
                                            d="M 10 50 A 40 40 0 0 1 90 50"
                                            fill="none"
                                            stroke="#eee"
                                            strokeWidth="8"
                                        />
                                        <path
                                            d="M 10 50 A 40 40 0 0 1 75 18"
                                            fill="none"
                                            stroke="url(#riskGradient)"
                                            strokeWidth="10"
                                            strokeLinecap="round"
                                        />
                                        <defs>
                                            <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#2e7d32" />
                                                <stop offset="50%" stopColor="#ed6c02" />
                                                <stop offset="100%" stopColor="#d32f2f" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                    <div className="meter-center">
                                        <span className="meter-score">82</span>
                                        <span className="meter-status high">High Risk</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bar-chart-container">
                                <ResponsiveContainer width="100%" height={100}>
                                    <BarChart data={barData}>
                                        <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                                            {barData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="bottom-panel dp-summary-panel shadow-sm">
                        <h3>Differential Privacy Output</h3>
                        <div className="dp-info-stack">
                            <div className="dp-info-row">
                                <Zap size={18} className="blue-icon" />
                                <div className="dp-info-text">
                                    <span className="dp-label">DP Total Records:</span>
                                    <span className="dp-value">1,540 <small>(±3)</small></span>
                                </div>
                            </div>
                            <div className="dp-info-row">
                                <Database size={18} className="orange-icon" />
                                <div className="dp-info-text">
                                    <span className="dp-label">Noise Level:</span>
                                    <span className="dp-link">Low Noise</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 4: Dataset Summary (Bottom) */}
                <div className="analyzer-section-box shadow-sm">
                    <div className="box-header">Dataset Summary</div>
                    <div className="box-content flex gap-xl">
                        <div className="metric-box-container">
                            <div className="risk-metric-row red">
                                <ShieldAlert size={18} />
                                <span>High Risk Records:</span>
                                <strong>120</strong>
                            </div>
                            <div className="risk-metric-row orange">
                                <div className="custom-indicator">1</div>
                                <span>Medium Risk Records:</span>
                                <strong>230</strong>
                            </div>
                            <div className="risk-metric-row green">
                                <ShieldCheck size={18} />
                                <span>Low Risk Records:</span>
                                <strong>150</strong>
                            </div>
                        </div>
                        <div className="chart-section">
                            <h3 className="chart-title-text">Risk Analysis Breakdown</h3>
                            <div className="real-chart-container">
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="40%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Legend
                                            layout="vertical" verticalAlign="middle" align="right"
                                            wrapperStyle={{ paddingLeft: '20px', fontSize: '12px', fontWeight: '600' }}
                                            formatter={(value, entry) => (
                                                <span style={{ color: '#212529' }}>{value} ({entry.payload.value}%)</span>
                                            )}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default RiskAnalyzer;
