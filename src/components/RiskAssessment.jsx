import React from 'react';
import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import './RiskAssessment.css';

export const RiskAssessment = () => {
    return (
        <div className="risk-assessment-card">
            <div className="section-header-blue">
                <h2>Privacy Risk Assessment</h2>
            </div>
            <div className="risk-assessment-content">
                <div className="risk-attr-row high">
                    <div className="attr-icon-wrapper">
                        <AlertTriangle size={18} />
                    </div>
                    <div className="attr-content">
                        <span className="attr-label">High Risk Attributes:</span>
                        <span className="attr-text">State, District, Social Group</span>
                    </div>
                </div>
                <div className="risk-attr-row medium">
                    <div className="attr-icon-wrapper">
                        <AlertCircle size={18} />
                    </div>
                    <div className="attr-content">
                        <span className="attr-label">Medium Risk Attributes:</span>
                        <span className="attr-text">Household Type, Activity, Gender Code</span>
                    </div>
                </div>
                <div className="risk-attr-row low">
                    <div className="attr-icon-wrapper">
                        <CheckCircle size={18} />
                    </div>
                    <div className="attr-content">
                        <span className="attr-label">Low Risk Attributes:</span>
                        <span className="attr-text">NIC Description, Worker Counts</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RiskAssessment;
