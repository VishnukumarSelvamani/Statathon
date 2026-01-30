import React from 'react';
import { Card } from './ui/Card';
import { ChevronDown } from 'lucide-react';
import './RiskTable.css';

export const RiskTable = () => {
    const tableData = [
        { slNo: 224, stateName: 'Prakasam', district: 'Prakasam', activity: 'Construction', riskLevel: 'High', dpCount: 1 },
        { slNo: 223, stateName: 'Ananthapur', district: 'Ananthapur', activity: 'Construction', riskLevel: 'Medium', dpCount: 2 },
        { slNo: 224, stateName: 'Chittoor', district: 'Chittoor', activity: 'Whole Sale Trade & Retail Trade', riskLevel: 'Low', dpCount: 1 },
        { slNo: 225, stateName: 'Chittoor', district: 'Chittoor', activity: 'Whole Sale Trade', riskLevel: 'Low', dpCount: 1 },
    ];

    return (
        <div className="risk-table-container">
            <div className="section-header-blue table-header-flex">
                <h2>Data Preview & Risk Analysis</h2>
                <div className="header-dots">
                    <span></span><span></span>
                </div>
            </div>
            <div className="table-wrapper">
                <table className="gov-data-table">
                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>State Name <ChevronDown size={14} /></th>
                            <th>District <ChevronDown size={14} /></th>
                            <th>Activity</th>
                            <th>Privacy Risk Level <ChevronDown size={14} /></th>
                            <th>DP Hired Male Worker <ChevronDown size={14} /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, idx) => (
                            <tr key={idx}>
                                <td>{row.slNo}</td>
                                <td className="font-semibold">{row.stateName}</td>
                                <td>{row.district}</td>
                                <td>{row.activity}</td>
                                <td>
                                    <span className={`risk-badge-full ${row.riskLevel.toLowerCase()}`}>
                                        {row.riskLevel}
                                    </span>
                                </td>
                                <td className="font-bold text-center">{row.dpCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RiskTable;
