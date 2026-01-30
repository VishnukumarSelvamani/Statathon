import React from 'react';
import { ChevronDown } from 'lucide-react';
import './SummaryCard.css';

export const SummaryCard = ({ label, value, hasDropdown, statusColor }) => {
    return (
        <div className="summary-card-horizontal">
            <div className="summary-card-content">
                <span className="summary-card-label">{label}:</span>
                <div className="summary-card-value-row">
                    <span className={`summary-card-value ${statusColor ? `status-${statusColor}` : ''}`}>
                        {value}
                    </span>
                    {hasDropdown && <ChevronDown size={14} className="dropdown-icon" />}
                </div>
            </div>
        </div>
    );
};

export default SummaryCard;
