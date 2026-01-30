import React from 'react';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { Card } from './ui/Card';
import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import './DatasetSummary.css';

export const DatasetSummary = () => {
    const pieData = [
        { name: 'High Risk', value: 24, color: '#c5221f' },
        { name: 'Medium Risk', value: 46, color: '#f29900' },
        { name: 'Low Risk', value: 30, color: '#137333' }
    ];

    return (
        <div className="dataset-summary-card">
            <div className="section-header-blue">
                <h2>Dataset Summary</h2>
            </div>
            <div className="dataset-summary-content">
                <div className="metrics-column">
                    <div className="metric-row">
                        <div className="metric-item high">
                            <AlertTriangle size={20} className="metric-icon" />
                            <span className="metric-label">High Risk Records:</span>
                            <span className="metric-value">120</span>
                        </div>
                    </div>
                    <div className="metric-row">
                        <div className="metric-item medium">
                            <span className="medium-badge">1</span>
                            <span className="metric-label">Medium Risk Records:</span>
                            <span className="metric-value">230</span>
                        </div>
                    </div>
                    <div className="metric-row">
                        <div className="metric-item low">
                            <CheckCircle size={20} className="metric-icon" />
                            <span className="metric-label">Low Risk Records:</span>
                            <span className="metric-value">150</span>
                        </div>
                    </div>
                </div>

                <div className="chart-column">
                    <div className="chart-wrapper">
                        <h3 className="chart-title">Risk Analysis Breakdown</h3>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height={220}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={0}
                                        outerRadius={80}
                                        paddingAngle={0}
                                        dataKey="value"
                                        label={({ value }) => `${value}%`}
                                        labelLine={false}
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Legend
                                        verticalAlign="middle"
                                        align="right"
                                        layout="vertical"
                                        iconType="square"
                                        formatter={(value, entry) => {
                                            const { payload } = entry;
                                            return <span className="legend-text">{value} {payload.value}%</span>;
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatasetSummary;
