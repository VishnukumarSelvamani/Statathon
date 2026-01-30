import React from 'react';
import {
    ShieldAlert,
    ShieldCheck,
    PlusSquare,
    Activity,
    CheckCircle2,
    ChevronDown
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import './Anonymization.css';

export const Anonymization = () => {
    const pieData = [
        { name: 'High Risk', value: 24, color: '#d32f2f' },
        { name: 'Medium Risk', value: 46, color: '#ed6c02' },
        { name: 'Low Risk', value: 30, color: '#2e7d32' }
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
                        <div className="box-content no-padding overflow-x">
                            <table className="analyzer-table">
                                <thead>
                                    <tr>
                                        <th>SL No.</th>
                                        <th>File Name</th>
                                        <th>Risk Level</th>
                                        <th>Approval (Accept / Reject)</th>
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

                {/* Section 3: Privacy Risk Assessment */}
                <div className="analyzer-section-box shadow-sm">
                    <div className="box-header">Re-Identification Risk Score</div>
                    <div className="box-content no-padding">
                        <div className="risk-assessment-row hover-bg">
                            <div className="risk-level-icon red"><ShieldAlert size={16} /></div>
                            <div className="risk-text">High Risk Attributes: <span className="red-text">State, District, Social Group</span></div>
                        </div>
                        <div className="risk-assessment-row hover-bg">
                            <div className="risk-level-icon orange"><ShieldAlert size={16} /></div>
                            <div className="risk-text">Medium Risk Attributes: <span className="orange-text">Household Type, Activity, Gender Code</span></div>
                        </div>
                        <div className="risk-assessment-row hover-bg">
                            <div className="risk-level-icon green"><ShieldCheck size={16} /></div>
                            <div className="risk-text">Low Risk Attributes: <span className="green-text">NIC Description, Worker Counts</span></div>
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
                                            layout="vertical"
                                            verticalAlign="middle"
                                            align="right"
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

export default Anonymization;
