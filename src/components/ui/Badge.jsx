import React from 'react';
import './Badge.css';

export const Badge = ({ status }) => {
    const getBadgeClass = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
            case 'approved':
            case 'safe':
            case 'accepted':
                return 'badge-success';
            case 'in progress':
            case 'medium':
                return 'badge-warning';
            case 'at risk':
            case 'high':
            case 'rejected':
            case 'critical':
                return 'badge-danger';
            default:
                return 'badge-neutral';
        }
    };

    return (
        <span className={`gov-badge ${getBadgeClass(status)}`}>
            {status}
        </span>
    );
};
