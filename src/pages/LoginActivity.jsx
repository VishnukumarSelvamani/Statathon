import React from 'react';
import { ArrowLeft, User, Mail, Calendar, Clock, LogOut, CheckCircle, Database, Eye, Download, Activity, FileText, X } from 'lucide-react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './LoginActivity.css';

export const LoginActivity = () => {
    const navigate = useNavigate();

    const [logs, setLogs] = React.useState([]);
    const [selectedLog, setSelectedLog] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchLogs = async () => {
            try {
                const data = await api.fetchLoginActivity();
                setLogs(data);
            } catch (error) {
                console.error("Failed to fetch login logs", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    return (
        <div className="login-activity-page force-light-theme">
            <div className="activity-container">
                <div className="activity-header">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <ArrowLeft size={18} />
                        Back
                    </button>
                    <h1>Login Activity Log</h1>
                    <p className="subtitle">View recent login sessions and account activity.</p>
                </div>

                <div className="activity-card">
                    <table className="activity-table">
                        <thead>
                            <tr>
                                <th>User Details</th>
                                <th>Session Info</th>
                                <th>Dataset Accessed</th>
                                <th>Access Mode</th>
                                <th>Access Status</th>
                                <th>Login Date & Time</th>
                                <th>Logout Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>Loading logs...</td></tr>
                            ) : logs.map((session) => (
                                <tr key={session.id} className={session.status === 'Active Session' ? 'active-row' : ''}>
                                    <td>
                                        <div className="user-cell">
                                            <div className="user-icon-bg">
                                                <User size={16} />
                                            </div>
                                            <div className="user-info">
                                                <span className="user-name">{session.username}</span>
                                                <span className="user-email">{session.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="session-info">
                                            <span className="session-id">ID: {session.sessionId || 'N/A'}</span>
                                            <span className="module-tag">{session.module || 'Dashboard'}</span>
                                        </div>
                                    </td>
                                    <td>
                                        {session.dataset ? (
                                            <div className="dataset-cell clickable" onClick={() => setSelectedLog(session)}>
                                                <Database size={14} className="icon-blue" />
                                                <div className="dataset-info">
                                                    <span className="dataset-name">{session.dataset}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="dash">-</span>
                                        )}
                                    </td>
                                    <td>
                                        <span className={`badge ${session.datasetType === 'Raw' ? 'badge-red' : 'badge-green'}`}>
                                            {session.datasetType || 'N/A'}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="access-cell">
                                            {session.accessType === 'Download' && <Download size={14} className="icon-red" />}
                                            {session.accessType === 'View' && <Eye size={14} className="icon-green" />}
                                            {session.accessType === 'Analyze' && <Activity size={14} className="icon-purple" />}
                                            <span>{session.accessType}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="time-cell">
                                            <div className="dt-row">
                                                <Calendar size={14} className="icon-muted" />
                                                <span>{session.loginDate}</span>
                                            </div>
                                            <div className="dt-row">
                                                <Clock size={14} className="icon-muted" />
                                                <span>{session.loginTime}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="time-cell">
                                            {session.logoutDate && session.logoutDate !== '-' ? (
                                                <>
                                                    <div className="dt-row">
                                                        <Calendar size={14} className="icon-muted" />
                                                        <span>{session.logoutDate}</span>
                                                    </div>
                                                    <div className="dt-row">
                                                        <Clock size={14} className="icon-muted" />
                                                        <span>{session.logoutTime}</span>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="dt-row">
                                                    <span className="active-tag">Active / Not logged out yet</span>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                {/* Detail View Overlay */}
                {
                    selectedLog && (
                        <div className="detail-overlay-backdrop" onClick={() => setSelectedLog(null)}>
                            <div className="detail-overlay-panel" onClick={e => e.stopPropagation()}>
                                <div className="overlay-header">
                                    <h2>Session Details</h2>
                                    <button className="close-btn" onClick={() => setSelectedLog(null)}>
                                        <X size={20} />
                                    </button>
                                </div>
                                <div className="overlay-body">
                                    <div className="detail-section">
                                        <h3>User Information</h3>
                                        <div className="detail-grid">
                                            <div className="detail-item">
                                                <label>User Name</label>
                                                <span>{selectedLog.username}</span>
                                            </div>
                                            <div className="detail-item">
                                                <label>Email Address</label>
                                                <span>{selectedLog.email}</span>
                                            </div>
                                            <div className="detail-item">
                                                <label>Session ID</label>
                                                <code>{selectedLog.sessionId}</code>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="detail-divider"></div>

                                    <div className="detail-section">
                                        <h3>Dataset Access Information</h3>
                                        <div className="detail-grid">
                                            <div className="detail-item full-width">
                                                <label>Dataset Name</label>
                                                <div className="dataset-highlight">
                                                    <Database size={16} />
                                                    <span>{selectedLog.dataset}</span>
                                                </div>
                                            </div>
                                            <div className="detail-item">
                                                <label>Dataset Type</label>
                                                <span className={`badge ${selectedLog.datasetType === 'Raw' ? 'badge-red' : 'badge-green'}`}>
                                                    {selectedLog.datasetType}
                                                </span>
                                            </div>
                                            <div className="detail-item">
                                                <label>Access Permission</label>
                                                <span>{selectedLog.accessType}</span>
                                            </div>
                                            <div className="detail-item">
                                                <label>Login Date & Time</label>
                                                <span>{selectedLog.loginDate} • {selectedLog.loginTime}</span>
                                            </div>
                                            <div className="detail-item">
                                                <label>Logout Date & Time</label>
                                                <span>{selectedLog.logoutDate && selectedLog.logoutDate !== '-' ? (
                                                    `${selectedLog.logoutDate} • ${selectedLog.logoutTime}`
                                                ) : (
                                                    <span className="active-tag">Active / Not logged out yet</span>
                                                )}</span>
                                            </div>
                                            <div className="detail-item">
                                                <label>Module</label>
                                                <span>{selectedLog.module}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="detail-divider"></div>

                                    <div className="detail-section">
                                        <h3>Security Audit</h3>
                                        <div className="audit-log">
                                            <div className="audit-item">
                                                <CheckCircle size={14} className="icon-green" />
                                                <span>Identity Verified (MFA)</span>
                                            </div>
                                            <div className="audit-item">
                                                <CheckCircle size={14} className="icon-green" />
                                                <span>Access Policy Checked</span>
                                            </div>
                                            <div className="audit-item">
                                                <CheckCircle size={14} className="icon-green" />
                                                <span>Logging Enabled</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};
