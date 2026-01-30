import React, { useState } from 'react';
import { Download, ChevronDown, Search, Loader2 } from 'lucide-react';
import './DatasetAccess.css';

export const DatasetAccess = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const surveyTypes = [
        "Periodic Labour Force Survey",
        "Time Use Survey",
        "Household Consumption Expenditure Survey",
        "Annual Survey of Industries",
        "Annual Survey of Unincorporated Sector Enterprises",
        "Situation Assessment of Agri. Households / Land & Livestock Holdings",
        "Multiple Indicator Survey"
    ];

    const indianStates = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];

    const years = Array.from({ length: 27 }, (_, i) => 2000 + i);

    const handleProcess = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setShowResults(true);
        }, 1200);
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
                                    Process Datasets
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Section 2: Results Table */}
                {showResults && (
                    <div className="data-card shadow-sm animate-in">
                        <div className="card-header-with-info">
                            <h3>Available Datasets (Audit-Ready)</h3>
                            <span className="results-count">5 Results Found</span>
                        </div>
                        <div className="card-body no-padding">
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
                                    <tr>
                                        <td className="text-bold">PLFS Annual 2024</td>
                                        <td>Urban</td>
                                        <td>Maharashtra</td>
                                        <td>2024</td>
                                        <td>45,000</td>
                                        <td>
                                            <button className="download-icon-btn" title="Download CSV">
                                                <Download size={18} />
                                                Download
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-bold">PLFS Annual 2024</td>
                                        <td>Rural</td>
                                        <td>Maharashtra</td>
                                        <td>2024</td>
                                        <td>32,400</td>
                                        <td>
                                            <button className="download-icon-btn" title="Download CSV">
                                                <Download size={18} />
                                                Download
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="text-bold">HCE Survey</td>
                                        <td>Urban</td>
                                        <td>Maharashtra</td>
                                        <td>2023</td>
                                        <td>28,500</td>
                                        <td>
                                            <button className="download-icon-btn" title="Download CSV">
                                                <Download size={18} />
                                                Download
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DatasetAccess;
