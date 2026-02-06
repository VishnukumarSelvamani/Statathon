import React, { useEffect } from 'react';
import { ShieldCheck, Lock, FileCheck } from 'lucide-react';
import { api } from '../services/api';
import { useApi } from '../context/ApiContext';
import './ProofPage.css';

export const ProofPage = () => {
    const { riskMetrics, datasets, selectedDataset, selectDataset } = useApi();
    const stats = riskMetrics?.globalStats || { totalFiles: 0, highRisk: 0, pending: 0, approved: 0 };

    const [rawData, setRawData] = React.useState(null);
    const [anonData, setAnonData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (!selectedDataset) return;
        const fetchData = async () => {
            setLoading(true);
            try {
                // Use Standard APIs: assessTable (Raw) and assessDataset (Anon Output)
                const [raw, anon] = await Promise.all([
                    api.assessTable(selectedDataset.id || selectedDataset.name),
                    api.assessDataset(selectedDataset.id || selectedDataset.name)
                ]);
                setRawData(raw);
                setAnonData(anon);
            } catch (e) {
                console.error("Failed to fetch proof data", e);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [selectedDataset]);

    const handleDatasetChange = (id) => {
        const ds = datasets.find(d => (d.id === id || d.name === id));
        if (ds) selectDataset(ds);
    };

    // Fallback for direct page visits if no dataset is selected yet
    React.useEffect(() => {
        if (!selectedDataset && datasets.length > 0) {
            selectDataset(datasets[0]);
        }
    }, [selectedDataset, datasets, selectDataset]);

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
                            <span className="stat-value">{stats.totalFiles.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon-wrap red">
                            <ShieldCheck size={24} />
                        </div>
                        <div className="stat-details">
                            <span className="stat-label">HIGH RISK</span>
                            <span className="stat-value">{stats.highRisk}</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon-wrap yellow">
                            <ShieldCheck size={24} />
                        </div>
                        <div className="stat-details">
                            <span className="stat-label">MEDIUM RISK</span>
                            <span className="stat-value">{stats.pending}</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon-wrap green">
                            <ShieldCheck size={24} />
                        </div>
                        <div className="stat-details">
                            <span className="stat-label">SAFE FILES</span>
                            <span className="stat-value">{stats.approved}</span>
                        </div>
                    </div>
                </div>

                <div className="proof-header-section">
                    <div className="gov-header-flex">
                        <div>
                            <h2>Dataset Proof & Validation</h2>
                            <p className="subtitle">Select a dataset to compare raw source vs anonymized output.</p>
                        </div>
                        <div className="audit-hash-badge">
                            <Lock size={14} />
                            <span>Audit Ref: {selectedDataset ? `LOG-${selectedDataset.id || selectedDataset.name.substring(0, 6).toUpperCase()}` : 'PENDING'}</span>
                        </div>
                    </div>
                </div>

                <div className="dataset-selector">
                    <label>Select Dataset Source</label>
                    <select
                        value={selectedDataset?.id || selectedDataset?.name || ''}
                        onChange={(e) => handleDatasetChange(e.target.value)}
                        className="gov-select"
                    >
                        <option value="">-- Choose a Dataset --</option>
                        {datasets.map(d => (
                            <option key={d.id || d.name} value={d.id || d.name}>{d.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {selectedDataset && !loading && rawData && anonData ? (
                <div className="comparison-container">
                    {/* Raw Data Section */}
                    <div className="section-panel raw-panel">
                        <div className="panel-header raw-header">
                            <div className="header-icon"><FileCheck /></div>
                            <h3>Raw Data Source</h3>
                            <span className="badge badge-red">Restricted</span>
                        </div>
                        <div className="panel-body">
                            <div className="meta-grid">
                                <div className="meta-item">
                                    <label>Dataset Name</label>
                                    <span>{rawData.name}</span>
                                </div>
                                <div className="meta-item">
                                    <label>Total Records</label>
                                    <span>{rawData.recordCount?.toLocaleString()}</span>
                                </div>
                                <div className="meta-item full">
                                    <label>Schema (Fields)</label>
                                    <div className="schema-tags">
                                        {rawData.schema?.map(f => (
                                            <span key={f.name}>{f.name} <small>({f.type})</small></span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="preview-table-wrapper">
                                <h4>Data Preview (Top 5)</h4>
                                <table className="mini-table">
                                    <thead>
                                        <tr>{Object.keys(rawData?.preview?.[0] || {}).map(k => <th key={k}>{k}</th>)}</tr>
                                    </thead>
                                    <tbody>
                                        {rawData?.preview?.map((row, i) => (
                                            <tr key={i}>
                                                {Object.values(row).map((v, j) => <td key={j}>{v}</td>)}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Anonymized Data Section */}
                    <div className="section-panel anon-panel">
                        <div className="panel-header anon-header">
                            <div className="header-icon"><ShieldCheck /></div>
                            <h3>Anonymized Output</h3>
                            <span className="badge badge-green">Public Safe</span>
                        </div>
                        <div className="panel-body">
                            <div className="meta-grid">
                                <div className="meta-item">
                                    <label>Anonymization Techniques</label>
                                    <ul className="tech-list">
                                        {anonData.techniques?.map(t => <li key={t}>{t}</li>)}
                                    </ul>
                                </div>
                                <div className="meta-item">
                                    <label>Privacy Budget</label>
                                    <span>ε = {anonData.epsilon || anonData.privacy_budget || 'N/A'}</span>
                                </div>
                                <div className="meta-item full">
                                    <label>Masked Fields</label>
                                    <div className="schema-tags">
                                        {anonData.maskedFields?.map(f => (
                                            <span key={f} className="tag-masked">{f}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="preview-table-wrapper">
                                <h4>Anonymized Preview (Top 5)</h4>
                                <table className="mini-table anon-table">
                                    <thead>
                                        <tr>{Object.keys(anonData?.preview?.[0] || {}).map(k => <th key={k}>{k}</th>)}</tr>
                                    </thead>
                                    <tbody>
                                        {anonData?.preview?.map((row, i) => (
                                            <tr key={i}>
                                                {Object.values(row).map((v, j) => <td key={j}>{v}</td>)}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="empty-state">
                    {loading ? <div className="loader">Loading Dataset data...</div> : <div className="placeholder-text"><FileCheck size={48} /> Please select a dataset to view proof.</div>}
                </div>
            )}
        </div>

    );
};

export default ProofPage;
