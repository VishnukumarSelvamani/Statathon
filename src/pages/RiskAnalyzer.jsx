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
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, Bar, Tooltip } from 'recharts';
import { useApi } from '../context/ApiContext';

import './Anonymization.css';
import './RiskAnalyzer.css';

export const RiskAnalyzer = () => {
    const {
        riskMetrics, dpOutput, selectedDataset, runQueryAssessment,
        datasets, selectDataset, noiseLevel, updateNoiseLevel, isLoading, error, exportReport
    } = useApi();
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');

    // Force sync with global dataset if needed
    React.useEffect(() => {
        if (!selectedDataset && datasets.length > 0) {
            selectDataset(datasets[0]);
        }
    }, [selectedDataset, datasets, selectDataset]);

    // Dynamic Pie Data
    const pieData = React.useMemo(() => {
        // Fallback to empty only if no summary exists (e.g., initial load)
        if (!riskMetrics?.summary) return [];

        return [
            { name: 'High Risk', value: riskMetrics.summary.highRisk || 0, color: '#d32f2f' },
            { name: 'Medium Risk', value: riskMetrics.summary.mediumRisk || 0, color: '#ed6c02' },
            { name: 'Low Risk', value: riskMetrics.summary.lowRisk || 0, color: '#2e7d32' }
        ];
    }, [riskMetrics]);

    // Dynamic Bar Chart Data
    const barData = React.useMemo(() => {
        const rb = riskMetrics?.riskBreakdown || {};
        return [
            // Using backend values only.
            { name: 'QI Risk', value: rb.quasiIdentifier || 0, color: '#ed6c02', description: 'Risk from quasi-identifiers' },
            { name: 'Uniqueness', value: rb.uniqueness || 0, color: '#004d99', description: 'Attribute combination uniqueness' },
            { name: 'Protection', value: rb.anonymization || 0, color: '#2e7d32', description: 'Anonymization strength' },
            { name: 'Residual', value: rb.residual || 0, color: '#d32f2f', description: 'Remaining re-id risk' }
        ];
    }, [riskMetrics]);

    // Removed duplicate useApi destructuring

    // ...

    const handleExport = async () => {
        if (!selectedDataset) return;
        try {
            const result = await exportReport(selectedDataset.id);
            if (result && result.success && result.blob) {
                // Create Blob URL
                const url = window.URL.createObjectURL(result.blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', result.filename || `${selectedDataset.name}_report.csv`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
            }
        } catch (err) {
            console.error("Export failed:", err);
            alert("Failed to export report. Please try again.");
        }
    };

    const filteredDatasets = datasets.filter(ds =>
        ds.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDatasetSelect = (ds) => {
        selectDataset(ds);
        setIsDropdownOpen(false);
    };

    // Auto-select if none (e.g. direct page visit)
    React.useEffect(() => {
        if (!selectedDataset && datasets.length > 0) {
            selectDataset(datasets[0]);
        }
    }, [selectedDataset, datasets, selectDataset]);

    // NON-BLOCKING RENDER: Always render structure.

    return (
        <div className="analyzer-page-container animate-fade-in">


            {/* Error Banner */}
            {error && (
                <div style={{ margin: '0 20px 10px 20px', padding: '15px', backgroundColor: '#ffebee', borderRadius: '8px', border: '1px solid #ffcdd2', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <ShieldAlert size={24} color="#d32f2f" />
                    <div style={{ flex: 1 }}>
                        <strong className="red-text">System Alert:</strong>
                        <span className="ml-sm text-muted">{error}</span>
                    </div>
                    <button className="gov-btn-secondary small" onClick={() => window.location.reload()}>Retry</button>
                </div>
            )}

            {/* No Dataset Banner */}
            {!selectedDataset && !isLoading && (
                <div style={{ margin: '0 20px 20px 20px', padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px', textAlign: 'center' }}>
                    <Database size={32} color="#1976d2" style={{ marginBottom: '10px' }} />
                    <h3 className="blue-text" style={{ margin: '0 0 10px 0' }}>No Dataset Selected</h3>
                    <p className="text-muted">Please select a dataset to view risk analysis.</p>
                </div>
            )}

            {/* 1. Header Cards (Dataset Info) */}
            <div className="analyzer-header-strip shadow-sm">
                <div className="strip-card clickable" onClick={() => setIsDropdownOpen(!isDropdownOpen)} style={{ position: 'relative' }}>
                    <span className="strip-label">Dataset Uploaded:</span>
                    <span className="strip-value blue-text">
                        {selectedDataset ? selectedDataset.name : 'Select Dataset'}
                    </span>
                    <ChevronDown size={14} className="strip-icon" />

                    {isDropdownOpen && (
                        <div className="dataset-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                            <div className="dropdown-search">
                                <input
                                    type="text"
                                    placeholder="Search datasets..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <div className="dropdown-list">
                                {filteredDatasets.length > 0 ? (
                                    filteredDatasets.map((ds, idx) => (
                                        <div
                                            key={ds.id || idx}
                                            className="dropdown-item"
                                            onClick={() => handleDatasetSelect(ds)}
                                        >
                                            {ds.name}
                                        </div>
                                    ))
                                ) : (
                                    <div className="dropdown-item no-results">No datasets found</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className="strip-card">
                    <span className="strip-label">Total Records:</span>
                    <span className="strip-value">
                        {dpOutput?.totalRecords ? dpOutput.totalRecords.toLocaleString() : (isLoading ? <span className="text-muted text-sm">Loading...</span> : '-')}
                    </span>
                </div>
                <div className="strip-card">
                    <span className="strip-label">Privacy Audit Status:</span>
                    <span className="strip-value orange-text">
                        {riskMetrics?.auditStatus || (isLoading ? 'Analyzing...' : 'Pending')}
                    </span>
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
                                    {isLoading && (!riskMetrics?.fileRisks) ? (
                                        <tr>
                                            <td colSpan="5" className="text-center p-4">
                                                <div className="loader small inline-block mr-sm"></div>
                                                <span className="text-muted">Loading analysis data...</span>
                                            </td>
                                        </tr>
                                    ) : (riskMetrics?.fileRisks && riskMetrics.fileRisks.length > 0) ? riskMetrics.fileRisks.map((row, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{row.file}</td>
                                            <td><span className={`risk-badge ${row.riskLevel?.toLowerCase() || 'low'}`}>{row.riskLevel || 'Unknown'}</span></td>
                                            <td><span className={`approval-text ${row.approval?.toLowerCase() || 'pending'}`}>{row.approval || 'Pending'}</span></td>
                                            <td>{row.dpRecords ? row.dpRecords.toLocaleString() : '-'}</td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan="5" className="text-center p-4">No risk data available.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="analyzer-section-box output-section shadow-sm">
                        <div className="box-header">Differential Privacy Output</div>
                        <div className="box-content">
                            <div className="output-item-row" title="Epsilon (ε) represents the privacy budget.">
                                <CheckCircle2 size={16} className="color-orange" />
                                <span>Privacy Budget (Epsilon):</span>
                                <strong className="ml-auto">{dpOutput?.epsilon !== undefined ? dpOutput.epsilon : (isLoading ? '...' : '-')}</strong>
                            </div>
                            <div className="output-item-row" title="Noise mechanism used.">
                                <PlusSquare size={16} className="color-blue" />
                                <span>Noise Distribution:</span>
                                <span className="ml-auto blue-link-text">{dpOutput?.noiseDistribution || (isLoading ? '...' : '-')}</span>
                            </div>
                            <div className="output-item-row" title="Magnitude of noise added.">
                                <Activity size={16} className="color-orange" />
                                <span>Noise Added:</span>
                                <strong className="ml-auto">{dpOutput?.noiseAdded || (isLoading ? '...' : '-')}</strong>
                            </div>
                            <div className="dp-explanation-box mt-md p-sm bg-light-blue rounded-sm border-dashed">
                                <small className="text-muted italic">{dpOutput?.explanation || "Select a dataset to view privacy impact."}</small>
                            </div>
                            <button
                                className="gov-btn-primary mt-lg"
                                style={{ width: '100%' }}
                                onClick={handleExport}
                                disabled={!selectedDataset || isLoading}
                            >
                                {isLoading ? 'Processing...' : 'Export Report'}
                            </button>
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
                                        <span className="meter-score">{riskMetrics?.score || 0}</span>
                                        <span className={`meter-status ${riskMetrics?.score > 70 ? 'high' : (riskMetrics?.score > 30 ? 'medium' : 'low')}`}>
                                            {riskMetrics?.score ? (riskMetrics.score > 70 ? 'High Risk' : (riskMetrics.score > 30 ? 'Medium Risk' : 'Low Risk')) : 'No Data'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="bar-chart-container">
                                <ResponsiveContainer width="100%" height={140}>
                                    <BarChart data={barData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
                                        <Tooltip
                                            cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    const data = payload[0].payload;
                                                    return (
                                                        <div className="risk-custom-tooltip" style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                                                            <p style={{ fontWeight: 'bold', color: data.color, margin: 0 }}>{data.name}: {data.value}</p>
                                                            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#555' }}>{data.description}</p>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                            {
                                                barData.map((entry, index) => (
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
                                    <span className="dp-value">{dpOutput?.totalRecords ? dpOutput.totalRecords.toLocaleString() : '-'}</span>
                                </div>
                            </div>
                            <div className="dp-info-row">
                                <Database size={18} className="orange-icon" />
                                <div className="dp-info-text">
                                    <span className="dp-label">Noise Level:</span>
                                    <span
                                        className={`dp-link ${noiseLevel === 'low' ? 'active-noise' : ''}`}
                                        onClick={() => updateNoiseLevel(noiseLevel === 'low' ? 'standard' : 'low')}
                                        style={{ cursor: 'pointer', textDecoration: 'underline' }}
                                        title="Toggle Noise Level"
                                    >
                                        {noiseLevel === 'low' ? 'Low Noise (Active)' : 'Standard Noise'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section 4: Dataset Summary (Bottom) */}
                <div className="analyzer-section-box shadow-sm dataset-summary-box">
                    <div className="box-header">Dataset Summary</div>
                    <div className="box-content">
                        <div className="metric-box-container">
                            <div className="risk-metric-row red">
                                <ShieldAlert size={18} />
                                <span>High Risk Records:</span>
                                <strong>{riskMetrics?.summary?.highRiskCount !== undefined ? riskMetrics.summary.highRiskCount : '-'}</strong>
                            </div>

                            <div className="risk-metric-row orange">
                                <div className="custom-indicator">1</div>
                                <span>Medium Risk Records:</span>
                                <strong>{riskMetrics?.summary?.mediumRiskCount !== undefined ? riskMetrics.summary.mediumRiskCount : '-'}</strong>
                            </div>
                            <div className="risk-metric-row green">
                                <ShieldCheck size={18} />
                                <span>Low Risk Records:</span>
                                <strong>{riskMetrics?.summary?.lowRiskCount !== undefined ? riskMetrics.summary.lowRiskCount : '-'}</strong>
                            </div>
                        </div>
                        <div className="chart-section">
                            <h3 className="chart-title-text">Risk Analysis Breakdown</h3>
                            <div className="real-chart-container">
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={65}
                                            innerRadius={30}
                                            paddingAngle={2}
                                            dataKey="value"
                                            label={({ percent }) => (percent > 0 ? `${(percent * 100).toFixed(0)}%` : '')}
                                            labelLine={false}
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                            ))}
                                        </Pie>
                                        <Legend
                                            layout="vertical"
                                            verticalAlign="middle"
                                            align="right"
                                            iconType="circle"
                                            wrapperStyle={{ fontSize: '12px', fontWeight: '500', color: '#333', right: 0 }}
                                        />
                                        <Tooltip
                                            formatter={(value) => [value, 'Records']}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
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
