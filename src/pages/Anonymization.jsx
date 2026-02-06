import React, { useEffect, useState, useRef, useMemo } from 'react';
import {
    ShieldAlert,
    ShieldCheck,
    PlusSquare,
    Activity,
    CheckCircle2,
    ChevronDown
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { useApi } from '../context/ApiContext';

import './Anonymization.css';

export const Anonymization = () => {
    const {
        riskMetrics,
        dpOutput,
        selectedDataset,
        datasets,
        selectDataset,
        isLoading,
        // New Context Items
        policies,
        runAnonymization,
        anonymizationResult,
        error
    } = useApi();

    // Guard Clause for Initial Load
    // (Removed selectedPolicy and handleAnonymize as per requirement for automatic flow)



    // Dropdown State
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeIndex, setActiveIndex] = useState(-1);
    const dropdownRef = useRef(null);
    const searchInputRef = useRef(null);

    // Filter datasets
    const filteredDatasets = datasets.filter(ds =>
        ds.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Keyboard Navigation & Click Outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        const handleKeyDown = (e) => {
            if (!isDropdownOpen) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveIndex(prev => (prev < filteredDatasets.length - 1 ? prev + 1 : prev));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));
            } else if (e.key === 'Enter' && activeIndex >= 0) {
                e.preventDefault();
                handleDatasetSelect(filteredDatasets[activeIndex]);
            } else if (e.key === 'Escape') {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isDropdownOpen, filteredDatasets, activeIndex]);

    // Auto-focus search input when opening
    useEffect(() => {
        if (isDropdownOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isDropdownOpen]);

    const handleDatasetSelect = (ds) => {
        if (!ds) return;
        selectDataset(ds);
        setIsDropdownOpen(false);
        setSearchTerm('');
        setActiveIndex(-1);
    };

    // Dynamic Pie Data
    const pieData = useMemo(() => {
        // Return empty if no summary
        if (!riskMetrics?.summary) return [
            { name: 'High Risk', value: 0, color: '#d32f2f' },
            { name: 'Medium Risk', value: 0, color: '#ed6c02' },
            { name: 'Low Risk', value: 0, color: '#2e7d32' }
        ];
        return [
            { name: 'High Risk', value: riskMetrics.summary.highRisk || 0, color: '#d32f2f' },
            { name: 'Medium Risk', value: riskMetrics.summary.mediumRisk || 0, color: '#ed6c02' },
            { name: 'Low Risk', value: riskMetrics.summary.lowRisk || 0, color: '#2e7d32' }
        ];
    }, [riskMetrics]);

    const { exportReport } = useApi();

    const handleExport = async () => {
        if (!selectedDataset) return;
        try {
            console.log("Exporting report for:", selectedDataset.name);
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
            // Optionally show user alert
            alert("Failed to export report. Please try again.");
        }
    };

    // Variables destructured above at line 132/133 are redundant if declared previously. 
    // Checking previous context... they were NOT at the top. 
    // I added them at line 132. But they were also at line 132 in the original?
    // Let's just remove these lines if they are duplicates of what I added or ensure only one set exists.

    // Actually, I see I added them at lines 132-133 in a previous step, but likely there were existing ones I missed.
    // The lint error says "Cannot redeclare... at line 132". 
    // I will remove the block I added if it conflicts, or remove the original. 
    // Looking at the view_file output from step 239:
    // Line 132: const { riskAttributes } = riskMetrics || {};
    // Line 133: const { explanations } = riskMetrics || {};

    // I will replace these lines with empty string or comments if they are the cause, 
    // OR if I see them appearing twice in the file.
    // The previous edit (Step 250) replaced lines 132-192 with a block that INCLUDED these lines.
    // So there shouldn't be duplicates unless they exist elsewhere.
    // Wait, step 250 replaced lines 132-192.
    // But the lint error persists.
    // Let's remove them here just to be safe and use direct access or declare them once cleanly.

    // Safe removal:

    const { riskAttributes } = riskMetrics || {};
    const { explanations } = riskMetrics || {};

    // NON-BLOCKING RENDER: Always render the structure, show inline states for missing data.

    return (
        <div className="analyzer-page-container animate-fade-in">


            {/* Error Banner - Non-blocking */}
            {error && (
                <div style={{ margin: '0 20px 20px 20px', padding: '15px', backgroundColor: '#ffebee', borderRadius: '8px', border: '1px solid #ffcdd2', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <ShieldAlert size={24} color="#d32f2f" />
                    <div style={{ flex: 1 }}>
                        <strong className="red-text">System Alert:</strong>
                        <span className="ml-sm text-muted">{error}</span>
                    </div>
                    <button className="gov-btn-secondary small" onClick={() => window.location.reload()}>Retry</button>
                </div>
            )}

            {/* No Dataset Selected Banner */}
            {!selectedDataset && !isLoading && (
                <div style={{ margin: '0 20px 20px 20px', padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px', textAlign: 'center' }}>
                    <ShieldCheck size={32} color="#1976d2" style={{ marginBottom: '10px' }} />
                    <h3 className="blue-text" style={{ margin: '0 0 10px 0' }}>No Dataset Selected</h3>
                    <p className="text-muted">Please select a dataset from the dropdown below to begin analysis.</p>
                </div>
            )}

            {/* 1. Header Strip */}
            <div className="analyzer-header-strip shadow-sm">
                <div
                    className="strip-card clickable"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    style={{ position: 'relative' }}
                    ref={dropdownRef}
                >
                    <span className="strip-label">Dataset Uploaded:</span>
                    <span className="strip-value blue-text">
                        {selectedDataset ? selectedDataset.name : 'Select Dataset'}
                    </span>
                    <ChevronDown size={14} className="strip-icon" />

                    {isDropdownOpen && (
                        <div className="dataset-dropdown-menu" onClick={(e) => e.stopPropagation()}>
                            <div className="dropdown-search">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search datasets..."
                                    value={searchTerm}
                                    onChange={(e) => { setSearchTerm(e.target.value); setActiveIndex(0); }}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                            <div className="dropdown-list">
                                {isLoading ? (
                                    <div className="dropdown-item no-results">Loading datasets...</div>
                                ) : filteredDatasets.length > 0 ? (
                                    filteredDatasets.map((ds, idx) => (
                                        <div
                                            key={ds.id || idx}
                                            className={`dropdown-item ${idx === activeIndex ? 'active' : ''} ${selectedDataset?.id === ds.id ? 'selected' : ''}`}
                                            onClick={() => handleDatasetSelect(ds)}
                                            onMouseEnter={() => setActiveIndex(idx)}
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
                        <div className="box-content no-padding overflow-x">
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
                                        /* Fallback / Initial State */
                                        <tr>
                                            <td colSpan="5" className="text-center p-4">No risk analysis data available yet.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="analyzer-section-box output-section shadow-sm">
                        <div className="box-header">Differential Privacy Output</div>
                        <div className="box-content">
                            <div className="output-item-row" title="Epsilon (ε) represents the privacy budget. Lower values mean higher privacy and more noise.">
                                <CheckCircle2 size={16} className="color-orange" />
                                <span>Privacy Budget (Epsilon):</span>
                                <strong className="ml-auto">{dpOutput?.epsilon !== undefined ? dpOutput.epsilon : '-'}</strong>
                            </div>
                            <div className="output-item-row" title="Laplace noise is added to the results to achieve (ε, 0)-Differential Privacy.">
                                <PlusSquare size={16} className="color-blue" />
                                <span>Noise Distribution:</span>
                                <span className="ml-auto blue-link-text">{dpOutput?.noiseDistribution || '-'}</span>
                            </div>
                            <div className="output-item-row" title="The range of randomness added to protect individual records.">
                                <Activity size={16} className="color-orange" />
                                <span>Noise Added:</span>
                                <strong className="ml-auto">{dpOutput?.noiseAdded || '-'}</strong>
                            </div>
                            <div className="dp-explanation-box mt-md p-sm bg-light-blue rounded-sm border-dashed">
                                <small className="text-muted italic">{dpOutput?.explanation || "Run analysis to view privacy impact."}</small>
                            </div>
                            <button className="gov-btn-primary mt-lg" style={{ width: '100%' }} onClick={handleExport}>Export Report</button>
                        </div>
                    </div>
                </div>

                {/* Section 2.5: Removed Manual Controls (Privacy Engine & Results) as per requirement for Automatic Flow */}


                {/* Section 2.6: Privatized Data Preview */}
                {anonymizationResult && anonymizationResult.privatized_data && (
                    <div className="analyzer-section-box shadow-sm mb-lg">
                        <div className="box-header">Privatized Data Preview (Safe to Share)</div>
                        <div className="box-content no-padding overflow-x">
                            <table className="analyzer-table">
                                <thead>
                                    <tr>
                                        {Object.keys(anonymizationResult.privatized_data[0] || {}).map((key) => (
                                            <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {anonymizationResult.privatized_data.slice(0, 5).map((row, idx) => (
                                        <tr key={idx}>
                                            {Object.values(row).map((val, vIdx) => (
                                                <td key={vIdx}>
                                                    {typeof val === 'object' ? JSON.stringify(val) : val}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="p-sm text-center text-muted border-top">
                                Showing 5 of {anonymizationResult.record_count} privatized records
                            </div>
                        </div>
                    </div>
                )}

                {/* Section 3: Privacy Risk Assessment with Explainability */}
                <div className="analyzer-section-box shadow-sm">
                    <div className="box-header">Re-Identification Risk Score Explainability</div>
                    <div className="box-content no-padding">
                        <div className="risk-assessment-row hover-bg" title={explanations?.high || "High risk attributes."}>
                            <div className="risk-level-icon red"><ShieldAlert size={16} /></div>
                            <div className="risk-text">High Risk Attributes: <span className="red-text">{riskAttributes?.high?.length > 0 ? riskAttributes.high.join(', ') : 'None'}</span></div>
                            <div className="ml-auto info-pill red">Critical</div>
                        </div>
                        <div className="risk-assessment-row hover-bg" title={explanations?.medium || "Medium risk attributes."}>
                            <div className="risk-level-icon orange"><ShieldAlert size={16} /></div>
                            <div className="risk-text">Medium Risk Attributes: <span className="orange-text">{riskAttributes?.medium?.length > 0 ? riskAttributes.medium.join(', ') : 'None'}</span></div>
                            <div className="ml-auto info-pill orange">Sensitive</div>
                        </div>
                        <div className="risk-assessment-row hover-bg" title={explanations?.low || "Low risk attributes."}>
                            <div className="risk-level-icon green"><ShieldCheck size={16} /></div>
                            <div className="risk-text">Low Risk Attributes: <span className="green-text">{riskAttributes?.low?.length > 0 ? riskAttributes.low.join(', ') : 'None'}</span></div>
                            <div className="ml-auto info-pill green">Minimal</div>
                        </div>
                    </div>
                </div>

                {/* Section 4: Dataset Summary (Bottom) */}
                <div className="analyzer-section-box shadow-sm dataset-summary-box">
                    <div className="box-header">Dataset Summary</div>
                    <div className="box-content flex gap-xl">
                        <div className="metric-box-container">
                            <div className="risk-metric-row red">
                                <ShieldAlert size={18} />
                                <span>High Risk Records:</span>
                                <strong>{riskMetrics?.summary?.highRiskCount !== undefined ? riskMetrics.summary.highRiskCount : (isLoading ? '...' : '-')}</strong>
                            </div>
                            <div className="risk-metric-row orange">
                                <div className="custom-indicator">1</div>
                                <span>Medium Risk Records:</span>
                                <strong>{riskMetrics?.summary?.mediumRiskCount !== undefined ? riskMetrics.summary.mediumRiskCount : (isLoading ? '...' : '-')}</strong>
                            </div>
                            <div className="risk-metric-row green">
                                <ShieldCheck size={18} />
                                <span>Low Risk Records:</span>
                                <strong>{riskMetrics?.summary?.lowRiskCount !== undefined ? riskMetrics.summary.lowRiskCount : (isLoading ? '...' : '-')}</strong>
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
                                            outerRadius={80}
                                            dataKey="value"
                                            label={({ percent }) => (percent > 0 ? `${(percent * 100).toFixed(0)}%` : '')}
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
                                            wrapperStyle={{ fontSize: '12px', fontWeight: '500', color: '#333' }}
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
