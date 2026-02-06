import React, { useState, useEffect } from 'react';
import { Download, ChevronDown, Search, Loader2 } from 'lucide-react';
import { useApi } from '../context/ApiContext';
import './DatasetAccess.css';

export const DatasetAccess = () => {
    const { datasets, loadDatasets, isLoading } = useApi();
    const [isProcessing, setIsProcessing] = useState(false);
    const [showResults, setShowResults] = useState(false);

    // Initial Load of Datasets (if not already loaded by Context)
    useEffect(() => {
        if (!datasets || datasets.length === 0) {
            loadDatasets();
        }
    }, []);

    // Dynamic Filters derived from actual data
    const surveyTypes = React.useMemo(() => [...new Set(datasets.map(d => d.surveyType || d.name?.split('_')[0]))].filter(Boolean), [datasets]);
    const indianStates = React.useMemo(() => [...new Set(datasets.map(d => d.state))].filter(Boolean), [datasets]);
    const years = React.useMemo(() => [...new Set(datasets.map(d => d.year))].filter(Boolean).sort((a, b) => b - a), [datasets]);

    const handleProcess = () => {
        setIsProcessing(true);
        // Real data processing - no fake timeout
        // In a real app with pagination, we would call an API. Here we refresh or filter.
        loadDatasets().finally(() => {
            setIsProcessing(false);
            setShowResults(true);
        });
    };

    return (
        <div className="dashboard-content">
            <div className="dashboard-scroll-area-inner">
                {/* Section 1: Filters */}
                <div className="filter-card shadow-sm">
                    <div className="card-header">
                        <h3>Search NSS Datasets</h3>
                    </div>
                    <div className="filter-grid-formal">
                        <div className="filter-item">
                            <label>Survey Type</label>
                            <select className="gov-select">
                                <option>Select Survey Type</option>
                                {surveyTypes.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="filter-item">
                            <label>Sector</label>
                            <select className="gov-select">
                                <option>All Sectors</option>
                                <option>Urban</option>
                                <option>Rural</option>
                            </select>
                        </div>
                        <div className="filter-item">
                            <label>State</label>
                            <select className="gov-select">
                                <option>All Indian States</option>
                                {indianStates.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="filter-item">
                            <label>Year</label>
                            <select className="gov-select">
                                <option>Select Year</option>
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="filter-action-row">
                        <button
                            className="gov-btn-primary process-btn"
                            onClick={handleProcess}
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Search size={18} />
                                    Fetch Datasets
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Section 2: Results Table */}
                <div className="data-card shadow-sm animate-in">
                    <div className="card-header-with-info">
                        <h3>Available Datasets (Audit-Ready)</h3>
                        <span className="results-count">{datasets.length} Results Found</span>
                    </div>
                    <div className="card-body no-padding">
                        {isLoading ? (
                            <div className="p-4 text-center">Loading datasets...</div>
                        ) : (
                            <table className="gov-table">
                                <thead>
                                    <tr>
                                        <th>SURVEY NAME</th>
                                        <th>SECTOR</th>
                                        <th>STATE</th>
                                        <th>YEAR</th>
                                        <th>TOTAL RECORDS</th>
                                        <th>ACTION</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datasets.length > 0 ? datasets.map((ds, idx) => (
                                        <tr key={ds.id || idx}>
                                            <td className="text-bold">{ds.name || 'Unknown Survey'}</td>
                                            <td>{ds.sector || '-'}</td>
                                            <td>{ds.state || '-'}</td>
                                            <td>{ds.year || '-'}</td>
                                            <td>{ds.rowCount || 0}</td>
                                            <td>
                                                <button className="download-icon-btn" title="Download CSV">
                                                    <Download size={18} />
                                                    Download
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        /* Fallback row if no API data yet */
                                        <tr>
                                            <td colSpan="6" className="text-center text-muted p-4">
                                                No datasets found via API.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatasetAccess;
